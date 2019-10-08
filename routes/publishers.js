const router = require('express').Router();
let Publisher= require('../models/publisher.model');

router.get('/', (req,res)=>{
    Publisher.find()
        .then((publishers)=>res.json(publishers))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.post('/add',(req, res)=>{
    const name = req.body.name;
    const newPublisher= new Publisher({
        name:name
    });
    newPublisher.save()
        .then(()=>res.json('Publisher added! ||'+newPublisher.id))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.get('/:id', (req,res)=>{
    Publisher.findById(req.params.id)
        .then((publisher)=>res.json(publisher))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.post('/update/:id',(req,res)=>{
    Publisher.findById(req.params.id)
        .then((publisher)=>{
            publisher.name=req.body.name;
            publisher.save()
            .then(()=>res.json('Publisher updated!  ||'+publisher.id))
            .catch((err)=>res.status(400).json('Error: '+err ));
        })
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.delete('/:id',(req,res)=>{
    Publisher.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Publisher deleted!'))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

module.exports=router;