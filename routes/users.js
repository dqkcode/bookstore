const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const {registerValidation, loginValidation}= require('../config/validation');
let User= require('../models/user.model');

router.get('/', (req,res)=>{
    User.find()
        .then((users=>res.json(users)))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.post('/register', async (req, res)=>{
    //Validate
    const { error } = registerValidation(req.body);
    if (error){
        return res.status(400).json(error.details[0].message);
    }
    //Validate email
    const user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json('Email already exists');
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
    try{
        await newUser.save();
        res.status(200).json('User added!'+newUser.id);
    }catch(err){
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res)=>{
    //Validate
    const { error } = loginValidation(req.body);
    if (error){
        return res.status(400).json(error.details[0].message);
    }
    //Validate email
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json('Email does not exists');
    }
    const validPass= await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(400).json('Invalid password');
    }
    const token = jwt.sign({_id:user.id},process.env.TOKEN);
    res.header('auth-token',token).send(token);
});

router.get('/:id', (req,res)=>{
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