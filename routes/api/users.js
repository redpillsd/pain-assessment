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
// To create a user if role is not passed, the default value is "USER" if you not you can create any other role
router.post('/', [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'A valid Role is required')
],
async (req, res) => {
    const err = validationResult(req);
    
    if(!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const { firstName, lastName, email, password, role } = req.body;

    try {
        // Check if user exist
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
        }

        user = new User({
            firstName,
            lastName,
            email,
            password,
            role
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                active: user.active
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
*   @access      Private, ADMIN and MODERATOR roles only
*/
router.get('/', auth(['ADMIN', 'MODERATOR']), async (req, res) => {
    try {
        const users = await User.find().select('firstName lastName active role -_id');

        res.json(users);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
*   @route       GET api/users/profile/:id
*   @desc        Get user by Id
*   @access      Private
*/
router.get('/profile/:id', auth(), async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('firstName lastName email -_id');

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'User doesn\'t exist'}] });
        }

        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
*   @route       PUT api/users/profile/:id
*   @desc        Update user profile by id
*   @access      Private
*/
router.put('/profile/:id', auth(), async (req, res) => {
    try {
        const userId = req.params.id,
              updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('firstName lastName email -_id');

        if(!updatedUser) {
            return res.status(400).json({ errors: [{ msg: 'User doesn\'t exist'}] });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');  
    }
});

/*
*   @route       PUT api/users/activate/:id
*   @desc        Activate/Deactivate user
*   @access      Private, ADMIN and MODERATOR roles only
*/
router.put('/activate/:id', auth(['ADMIN', 'MODERATOR']), async (req, res) => {
    try {
        const userId = req.params.id,
              updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('-role -_id');

        if(!updatedUser) {
            return res.status(400).json({ errors: [{ msg: 'User doesn\'t exist'}] });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');  
    }
});

module.exports = router;