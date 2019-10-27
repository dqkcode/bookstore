import mongoose from 'mongoose';

const Schema= mongoose.Schema;
const publisherSchema = new Schema({
    name:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});

const Publisher= mongoose.model('Publisher',publisherSchema);

module.exports= Publisher;