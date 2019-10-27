const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt =require('jsonwebtoken');
const verify = require('../config/verify');
const config = require('config');
const User = require('../models/user.model');
// import {check, validationResult} from 'express-validator';
// import {verify} from '../config/verify';

router.get('/', verify, async (req,res)=>{
    try {
        const user= await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.post('/register',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid Email').isEmail(),
    check('password','Please enter a password with 5 or more characters').isLength({min:5}),
], async (req, res)=>{
    //Validate
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        //Validate email
        const user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({errors:[{msg:'User already exists'}]});
        }
        //Hash pass
        const salt= await bcrypt.genSalt(10);
        const hashPass= await bcrypt.hash(req.body.password,salt);
        //Save User
        const newUser= new User({
            email:req.body.email,
            password:hashPass,
            name:req.body.name
        });  
        await newUser.save();
        const payLoad={
            user:{
                id:newUser.id
            }
        }
        jwt.sign(
            payLoad,
            config.get('TOKEN'),
            {expiresIn:36000},
            (err,token)=>{
                if(err)  throw err;
                res.json({token});
            }
        )
    }catch(err){
        console.error(err.message);
        res.status(400).send('Server error');
    }
});

router.post('/login',[
    check('email','Please include a valid Email').isEmail(),
    check('password','Password is required').exists()
], async (req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        //Validate user
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({errors:[{msg:'Wrong email/password'}]});
        }
        const isMatch=await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Wrong email/password'}]});
        }
        const payLoad={
            user:{
                id:user.id
            }
        }
        jwt.sign(
            payLoad,
            config.get('TOKEN'),
            {expiresIn:72000},
            (err,token)=>{
                if(err)  throw err;
                res.json({token});
            }
        )
    }catch(err){
        console.error(err.message);
        res.status(400).send('Server error');
    }
});


router.get('/:id', async (req,res)=>{
    User.findById(req.params.id)
        .then((user)=>res.json(user))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.post('/update/:id',(req,res)=>{
    User.findById(req.params.id)
        .then((user)=>{
            user.userName=req.body.userName;
            user.password=req.body.password;
            user.name=req.body.name;
            user.email=req.body.email;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                  if (err) throw err;
                  user.password = hash;
                  user.save()
                  .then(()=>res.json('User updated!'))
                  .catch((err)=>res.status(400).json('Error: '+err ));
                });
            });
        })
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(()=>res.json('User deleted!'))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

module.exports=router;