const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');
const publisherRouter = require('./routes/publishers');
const userRouter = require('./routes/users');

const app = express();
const connection = mongoose.connection;

app.use(cors());
app.use(express.json({
    extended: true
}));
app.use(express.static('client/public'));
app.use(express.urlencoded({
    limit: '10mb',
    extended: false
}));

app.use('/authors', authorRouter);
app.use('/publishers', publisherRouter);
app.use('/users', userRouter);
app.use('/books', bookRouter);


const uri = config.get('ATLAS_URI');
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
connection.once('open', () => {
    console.log('MongoDB database connection established');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, (() => {
    console.log(`Connect to port ${PORT}`);
}));