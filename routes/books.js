import express from "express";
const router = express.Router();
import multer from "multer";
import path from "path";
import fs from "fs";
import {
	check,
	validationResult
} from 'express-validator';
import Book from "../models/book.model";
import Author from "../models/author.model";
import Publisher from "../models/book.model";

const uploadPath = path.join("client/public", Book.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
const upload = multer({
	dest: uploadPath,
	fileFilter: (req, file, callback) => {
		callback(null, imageMimeTypes.includes(file.mimetype));
	},
});

router.get('/', async (req, res) => {
	try {

		const books = await Book.find().populate('author', 'name').populate('publisher','name');
		res.status(200).json(books);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

router.get('/sort', async (req, res) => {
	try {
		const books = await Book.find().sort({discount:1});
		res.status(200).json(books);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

router.post("/add", upload.single("coverImage"),
[
	check('title', 'Title is required').not().isEmpty(),
	check('pageCount', 'Page Count is required').not().isEmpty(),
	check('price', 'Price is required').not().isEmpty(),
	check('author', 'Author is required').not().isEmpty(),
	check('publisher', 'Publisher is required').not().isEmpty(),
], async (req, res) => {		
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()
		});
	}
	
	try {
		const fileName = req.file != null ? req.file.filename : null;
		const newBook = new Book({
			title: req.body.title,
			description: req.body.description,
			publishDate: new Date(req.body.publishDate),
			pageCount: req.body.pageCount,
			price: req.body.price,
			coverImage: fileName,
			author: req.body.author,
			publisher: req.body.publisher,
			discount: req.body.discount,
		});
		let book = await newBook.save();
		res.status(200).json(book);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
		
});

router.get('/:id', async (req, res) => {
    try {
    	const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(400).json({
              msg: 'Publisher not found!'
            });
        }
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post("/update/:id", upload.single("coverImage"), [
	check('title', 'Title is required').not().isEmpty(),
	check('pageCount', 'Page Count is required').not().isEmpty(),
	check('price', 'Price is required').not().isEmpty(),
	check('author', 'Author is required').not().isEmpty(),
	check('publisher', 'Publisher is required').not().isEmpty(),
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()
		});
	}
	try {
		const fileName = req.file != null ? req.file.filename : null;
		const book = await Book.findById(req.params.id);
		let bookImageName = book.coverImage;
		if (bookImageName != null) {
			fs.unlinkSync(
				__dirname +
				`/../client/public/Images/bookCovers/${bookImageName}`,
				err => {
					if (err) throw err;
					console.log(`successfully deleted cover image`);
				},
			);
		}

		book.title = req.body.title;
		book.description = req.body.description;
		book.publishDate = new Date(req.body.publishDate);
		book.pageCount = req.body.pageCount;
		book.price = req.body.price;
		book.coverImage = fileName;
		book.author = req.body.author;
		book.publisher = req.body.publisher;
		book.discount = req.body.discount;

		let updatedBook = await book.save();
		res.status(200).json(updatedBook);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
	
});

router.delete("/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).json({
				msg: 'Book not found'
			});
		}
		let bookImageName = book.coverImage;
		if (bookImageName != null) {
			fs.unlinkSync(
				__dirname +
				`/../client/public/Images/bookCovers/${bookImageName}`,
				err => {
					if (err) throw err;
					console.log(`successfully deleted cover image`);
				},
			);
		}

		await book.remove();
		res.status(200).json({
			msg: 'Book removed!'
		});
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({
				msg: 'Book not found'
			});
    	}
    	res.status(500).send('Server Error');
	}
});

router.get('/authors', async (req, res) => {
	try {
		const authors = await Author.find();
		res.status(200).json(authors);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

router.get('/publishers', async (req, res) => {
	try {
		const publishers = await Publisher.find();
		res.status(200).json(publishers);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server Error');
	}
});

module.exports = router;