const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {
    check,
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const verify = require('../config/verify');
const config = require('config');
const User = require('../models/user.model');
// import {check, validationResult} from 'express-validator';
// import {verify} from '../config/verify';

router.get('/', verify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.get('/all', verify, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with 5 or more characters').isLength({
        min: 5
    }),
], async (req, res) => {
    //Validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        //Validate email
        const user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            });
        }
        //Hash pass
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        //Save User
        const newUser = new User({
            email: req.body.email,
            password: hashPass,
            name: req.body.name
        });
        const createdUser = await newUser.save();
        const payLoad = {
            user: {
                id: newUser.id
            }
        }
        jwt.sign(
            payLoad,
            config.get('TOKEN'), {
                expiresIn: 36000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server error');
    }
});

router.post('/login', [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        //Validate user
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Wrong email/password'
                }]
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Wrong email/password'
                }]
            });
        }
        const payLoad = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payLoad,
            config.get('TOKEN'), {
                expiresIn: 72000
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            }
        )
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server error');
    }
});

router.post('/add', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with 5 or more characters').isLength({min: 5}),
], async (req, res) => {
    //Validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        //Validate email
        const user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            });
        }
        //Hash pass
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        //Save User
        const newUser = new User({
            email: req.body.email,
            password: hashPass,
            name: req.body.name
        });
        const createdUser = await newUser.save();
        res.status(200).json(createdUser);
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(400).json({
                msg: 'User not found!'
            });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

router.post('/update/:id', [
    check('name', 'Name is required').not().isEmpty()
], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        user.name = req.body.name;

        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;