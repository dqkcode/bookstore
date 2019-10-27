import express from 'express';
const router= express.Router();
import {
  check,
  validationResult
} from 'express-validator';
import Author from '../models/author.model';

router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
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
    const newAuthor = new Author({
      name
    });
    let author = await newAuthor.save();
    res.status(200).json(author);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
          return res.status(400).json({
            msg: 'Author not found!'
          });
        }
        res.json(author);
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

    const author = await Author.findById(req.params.id);
    author.name = name;
    let updatedAuthor = await author.save();
    res.json(updatedAuthor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({
        msg: 'Author not found'
      });
    }
    await author.remove();
    res.status(200).json({
      msg: 'Author removed'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Author not found'
      });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;