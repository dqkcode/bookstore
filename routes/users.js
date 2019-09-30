const router = require('express').Router();
const bcrypt = require('bcryptjs');
let User= require('../models/user.model');

router.get('/', (req,res)=>{
    User.find()
        .then((users=>res.json(users)))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.post('/add',(req, res)=>{
    const {userName, password, name, email } = req.body;
    User.findOne({userName:userName}).then((user)=>{
        if(user){
            res.status(400).json('Error: UserName already exists' );
        }
        else{
            const newUser= new User({
                userName, 
                password, 
                name, 
                email
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save()
                  .then(()=>res.json('User added!'))
                  .catch((err)=>res.status(400).json('Error: '+err ));
                });
            });
        }
    }).catch((err)=>res.status(400).json('Error: '+err ));
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