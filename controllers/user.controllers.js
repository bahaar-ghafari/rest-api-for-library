var User = require('../models/user.model')
var Book = require('../models/book.model')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
// Get User
exports.getUser = async function(req, res, next) {
    try {
        user = await User.findById(req.params.id) .populate('Book')
        if (user == null) {
            return res.status(404).json({ message: 'Cant find User' })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: 500, message: err.message })
    }

    res.user = user
    next()
}
//upload picture
// exports.getPicture = async function(req, res, next) {
//     try {
//         user = await User.findById(req.params.id) .populate('Book')
//         if (user == null) {
//             return res.status(404).json({ message: 'Cant find User' })
//         }
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ status: 500, message: err.message })
//     }

//     res.user = user
//     next()
// }
// Get all Users
exports.getAll = async function (req, res) {
    try {
        const Users = await User.find();
        return res.status(200).json({ status: 200, data: Users });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ status: 400, message: err })
    }
}
// Get one User
exports.getOne = async function (req, res) {
    try {
        return res.status(200).json({ status: 200, data: res.user });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ status: 400, message: err.message })
    }
}
exports.booksByUser = async function(req, res) {
    const { id } = req.params;
    const user = await User.findById(id).populate('Book');
    try {
        return res.status(200).json({ status: 200, data: user });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ status: 400, message: err })
    }
}
// Create one User
exports.post = async function(req, res) {
    const { type, name, family,age ,email,password,books,avatar } = req.body;
    const user = new User({
        type,
        name,
        family,
        age,
        email,
        password,
        books,
        avatar
    })
    try {
        const newUser = await user.save()
        // Book.updateMany({ _id: { $in: req.body.books } }, { $addToSet: { users: newUser._id } });
        await Book.updateMany({ _id: { $in: req.body.books} }, { $addToSet: { users: newUser._id } });
        return res.status(201).json({ status: 200, data: newUser })
    } catch (err) {
        console.log(err.name)
        return res.status(400).json({ status: 400, message: err.name })
    }
}

// Update one User
exports.update = async function (req, res) {
    const { type, name, family,age ,email,password,books,avatar } = req.body;
    console.log("req.body",req.body)
    if (type != null) {
        res.user.type = type
    }
    if (name != null) {
        res.user.name = name
    }
    if (family != null) {
        res.user.family = family
    }
    if (age != null) {
        res.user.age = age
    }
    if (email != null) {
        res.user.email = email
    }
    if (password != null) {
        res.user.password = password
    }
    if (books != null) {
        res.user.books = books
    }
    if (avatar != null) {
        res.user.avatar = avatar
    }
    try {
        const updatedUser = await res.user.save()
        return res.status(201).json({ status: 200, data: updatedUser })
    } 
    catch(err) {
        console.log(err)
        res.status(400).json({ status: 400, message: err.message })
    }
}

exports.remove = async function (req, res) {
    try {
        res.user.remove()
        return res.status(200).json({ status: 200, message: 'Deleted This User' });
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ status: 400, message: err.message })
    }
}


