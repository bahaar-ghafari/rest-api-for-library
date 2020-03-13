// the model will handle how each and every subscriber, on an individual level, will look inside of our database
const mongoose = require('mongoose')
const Book = new mongoose.Schema({
    title: {
      type: String,
      required: '{PATH} is required!'
    },
    description: {
      type: String,
      required: false
    },
    author: {
      type: String,
      required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default:1
      },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Book'
    }],
  })

// exporting our subscriber schema
// ‘Subscriber’ is the name we want to give the model in our database
module.exports = mongoose.model('Book', Book)
