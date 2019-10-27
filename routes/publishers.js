const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const config = require('config');
const Publisher = require ('../models/publisher.model');
// import {Publisher} from '../models/publisher.model';

router.get('/', (req,res)=>{
    Publisher.find()
        .then((publishers)=>res.json(publishers))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.post('/add',[
    check('name', 'Name is required').not().isEmpty(),
  ], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name} = req.body;
    try{
        const newPublisher = new Publisher({
            name
        });
        let publisher=await newPublisher.save();
        res.json(publisher);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    
    newAuthor.save()
        .then(() => res.json('Author added! || ' + newAuthor.id))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req,res)=>{
    Publisher.findById(req.params.id)
        .then((publisher)=>res.json(publisher))
        .catch((err)=>res.status(400).json('Error: '+err ));
});

router.post('/update/:id', [
    check('name', 'Name is required').not().isEmpty()
  ], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name} = req.body;
    try{
        const publisher = Publisher.findById(req.params.id);
        publisher.name=name;
        let updatedAuthor = await publisher.save();
        res.json(updatedAuthor);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    
    newAuthor.save()
        .then(() => res.json('Author added! || ' + newAuthor.id))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/:id', async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.params.id);
    
        if (!publisher) {
          return res.status(404).json({ msg: 'Author not found' });
        }
    
        await publisher.remove();
    
        res.json({ msg: 'Author removed' });
      } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
          return res.status(404).json({ msg: 'Author not found' });
        }
        res.status(500).send('Server Error');
      }
});

module.exports=router;