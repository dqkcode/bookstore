import express from 'express';
const router = express.Router();
import {
  check,
  validationResult
} from 'express-validator';
import Publisher from '../models/publisher.model';

router.get('/', async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.status(200).json(publishers);
  } catch (error) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

router.post('/add', [
  check('name', 'Name is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const {
    name
  } = req.body;
  try {
    const newPublisher = new Publisher({
      name
    });
    let publisher = await newPublisher.save();
    res.status(200).json(publisher);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

router.get('/:id', async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.params.id);
        if (!publisher) {
            return res.status(400).json({
              msg: 'Publisher not found!'
            });
        }
        res.json(publisher);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/update/:id', [
  check('name', 'Name is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const {
    name
  } = req.body;
  try {

    const publisher = await Publisher.findById(req.params.id);
    publisher.name = name;
    let updatedPublisher = await publisher.save();
    res.json(updatedPublisher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) {
      return res.status(404).json({
        msg: 'Publisher not found'
      });
    }
    await publisher.remove();
    res.status(200).json({
      msg: 'Publisher removed'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Publisher not found'
      });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;