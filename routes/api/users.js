const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/Users');

/*
    @route       POST api/users
    @desc        Register user
    @access      Public 
*/
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('medicalRegNumber', 'Medical Registration Number is required').isLength({ min: 4 }),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
async (req, res) => {
    console.log(req.body);
    const err = validationResult(req);
    
    if(!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const { name, lastName, medicalRegNumber, email, password } = req.body;

    try {
        // Check if user exist
        let user = await User.findOne({ medicalRegNumber });

        if(user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists'}] });
        }

        user = new User({
            name,
            lastName,
            medicalRegNumber,
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
            { expiresIn: 360000},
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

module.exports = router;