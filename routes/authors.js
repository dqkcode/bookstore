const router = require('express').Router();
const verify = require('../config/verify');
let Author= require('../models/author.model');

router.get('/', (req,res)=>{
    Author.find()
        .then((authors=>res.json(authors)))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.post('/add',(req, res)=>{
    const name = req.body.name;
    const newAuthor= new Author({
        name:name
    });
    newAuthor.save()
        .then(()=>res.json('Author added! || '+ newAuthor.id))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.get('/:id', (req,res)=>{
    Author.findById(req.params.id)
        .then((author=>res.json(author)))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.post('/update/:id',(req,res)=>{
    Author.findById(req.params.id)
        .then((author)=>{
            author.name=req.body.name;
            author.save()
            .then(()=>res.json('Author updated! || '+ author.id))
            .catch((err)=>res.status(400).json('Error: '+err ));
        })
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.delete('/:id',(req,res)=>{
    Author.findByIdAndDelete(req.params.id)
        .then(()=>res.json('author deleted!'))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

module.exports=router;