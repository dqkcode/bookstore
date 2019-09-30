const mongoose = require('mongoose');
const path = require('path');

const coverImageBasePath = 'Images/bookCovers'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      publishDate: {
        type: Date,
        required: true
      },
      pageCount: {
        type: Number,
        required: true
      },
      coverImage: {
        type: String,
        required:true
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
      },
      publisher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Publisher'
      },
      discount: {
        type: String

      }
},
{
    timestamps:true
});

bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName)
  }
})

module.exports = mongoose.model('Book', bookSchema);
module.exports.coverImageBasePath = coverImageBasePath