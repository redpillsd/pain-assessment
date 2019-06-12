const express                       = require('express');
const router                        = express.Router();
const { check, validationResult }   = require('express-validator/check');
const bcrypt                        = require('bcryptjs');
const jwt                           = require('jsonwebtoken');
const config                        = require('config');
const auth                          = require('../../middleware/auth');
const User                          = require('../../models/User');

/*
*   @route       POST api/users
*   @desc        Create user
*   @access      Public 
*/
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
async (req, res) => {
    const err = validationResult(req);
    
    if(!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const { name, lastName, email, password } = req.body;

    try {
        // Check if user exist
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
        }

        user = new User({
            name,
            lastName,
            email,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

/*
*   @route       GET api/users
*   @desc        Get all users
*   @access      Private
*/
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find().select('name lastName active role -_id');

        res.json(users);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
*   @route       GET api/users/:id
*   @desc        Get user by Id
*   @access      Private
*/
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'User doesn\'t exist'}] });
        }

        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// TODO: Create a route to change user activate (just an admin user can modify this, add a new middleware?)

module.exports = router;