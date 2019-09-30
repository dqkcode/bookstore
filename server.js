const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const bodyParser=require('body-parser')
const authorRouter=require('./routes/authors');
const bookRouter=require('./routes/books');
const publisherRouter=require('./routes/publishers');
const userRouter= require('./routes/users');
require('dotenv').config();

const app= express();

app.use(cors());
app.use(express.json());
app.use(express.static('client/public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.use('/authors',authorRouter);
app.use('/publishers',publisherRouter);
app.use('/users',userRouter);
app.use('/books',bookRouter);


const uri= process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection established');
});

PORT = process.env.PORT||5000;
app.listen(PORT, (()=>{
    console.log(`Connect to port ${PORT}`);
}));