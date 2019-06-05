const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

/*  
@route       GET api/auth
@desc        Test route
@access      Public 
*/
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*
    @route       POST api/auth
    @desc        Authenticate user & get token
    @access      Public
*/
router.post('/', [
    check('medicalRegistrationNumber', 'Medical Registration Number is required').isLength({ min: 5 }),
    check('password', 'Password is required').isLength({ min: 6 })
],
async (req, res) => {
    console.log(req.body);
    const err = validationResult(req);
    
    if(!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const { medicalRegistrationNumber, password } = req.body;

    try {
        // Check if user exist
        let user = await User.findOne({ medicalRegistrationNumber });

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
        }

        // Check if password match
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
        }

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

module.exports = router;