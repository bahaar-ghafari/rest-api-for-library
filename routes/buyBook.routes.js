const express = require('express')
const router = express.Router()
var BookController = require('../controllers/book.controllers')
// buy book
router.post('/', BookController.buy)
module.exports = router