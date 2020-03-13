const express = require('express')
path = require('path'),rootPath = path.normalize(__dirname + '/../')
const router = express.Router()
var BookController = require('../controllers/book.controllers')
// Get all books
router.get('/', BookController.getAll)
// Get one book
router.get('/:id', BookController.getBook, BookController.getOne)
// Create one book
router.post('/', BookController.post)
// Update one book
router.patch('/:id', BookController.getBook, BookController.update)
// Get one book
router.delete('/:id', BookController.getBook, BookController.remove)
module.exports = router