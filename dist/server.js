"use strict";

import express from 'express';

import cors from 'cors';

import mongoose from 'mongoose';

import session from 'express-session';

import config from 'config';

import authorRouter from './routes/authors';

import bookRouter from './routes/books';

import publisherRouter from './routes/publishers';

import userRouter from './routes/users';

var app = express();
var connection = mongoose.connection;
app.use(cors());
app.use(express.json({
  extended: false
}));
app.use(express["static"]('client/public'));
app.use(express.urlencoded({
  limit: '10mb',
  extended: false
}));
app.use('/authors', authorRouter);
app.use('/publishers', publisherRouter);
app.use('/users', userRouter);
app.use('/books', bookRouter);
var uri = config.get('ATLAS_URI');
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
connection.once('open', function () {
  console.log('MongoDB database connection established');
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Connect to port ".concat(PORT));
});