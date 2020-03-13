const { calculateLimitAndOffset } = require('paginate-info')
var Book = require('../models/book.model')
var User = require('../models/user.model')
// Get Book
exports.getBook = async function (req, res, next) {
    try {
        book = await Book.findById(req.params.id).populate('User')
        if (book == null) {
            return res.status(404).json({ message: 'Cant find this Book1' })
        }
    } catch (err) {
        return res.status(500).json({ status: 500, message: err.message })
    }
    res.book = book
    next()
}

// Get all Books
exports.getAll = async function (req, res) {
    try {
        const { query: { currentPage, pageLimit } } = req;
        // const count = await Book.estimatedDocumentCount();
        const { limit, offset } = calculateLimitAndOffset(currentPage, pageLimit);
        const books = await Book.find()
        .skip(offset)
        .limit(limit);
        return res.status(200).json({status: 200, data: books});
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ status: 400, message: "cant find these books" })
    }
}
// Get one Book
exports.getOne = async function (req, res) {
    try {
        return res.status(200).json({ status: 200, data: res.book });
    }
    catch (err) {
        return res.status(400).json({ status: 400, message: err.message })
    }
}

// Create one Book 
exports.post = async function (req, res) {
    const { title, description, author, quantity, users } = req.body;
    const book = new Book({ title, description, author, quantity, users })
    try {
        const newBook = await book.save()
        // User.updateMany({ _id: { $in: req.body.users } }, { $addToSet: { books: newBook._id } });
        await User.updateMany({ _id: { $in: req.body.users } }, { $addToSet: { books: newBook._id } });
        return res.status(201).json({ status: 200, data: newBook })
    } catch (err) {
        console.log(err.name)
        return res.status(400).json({ status: 400, message: "data is invalid" })
    }
}
// Update one Book
exports.update = async function (req, res) {
    const { title, description, author, quantity, users } = req.body;
    if (title != null) {
        res.book.title = title
    }
    if (description != null) {
        res.book.description = description
    }
    if (author != null) {
        res.book.author = author
    }
    if (quantity != null) {
        res.book.quantity = quantity
    }
    if (users != null) {
        res.book.users = users
    }
    try {
        const updatedBook = await res.book.save()
        return res.status(201).json({ status: 200, data: updatedBook })
    } catch {
        res.status(400).json({ status: 400, message: err.message })
    }
}
exports.buy = async function (req, res) {
    try {
        //peyda kne ketabo
        book = await Book.findById(req.body.id)
        if (book == null) {
            return res.status(404).json({ message: 'Cant find this Book' })
        }
        //update book in database
        else for (i = 0; i < req.body.quantity; i++) {
            if (book.quantity != 0)
                book.quantity -= 1;
            else return res.send({
                status: false,
                msg: 'ein tedad ketab as ein ketab mojud nis'
            });
         }
           book.save();
            return res.status(201).json({ status: 200, msg: "mobarake" })
        }
     catch {
        res.status(400).json({ status: 400, message: err.message })
    }
}
exports.remove = async function (req, res) {
    try {
        res.book.remove()
        return res.status(200).json({ status: 200, message: 'Deleted This Book' });
    }
    catch (err) {
        return res.status(400).json({ status: 400, message: err.message })
    }
}


