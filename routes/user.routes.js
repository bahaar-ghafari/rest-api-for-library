const express = require('express')
path = require('path'),rootPath = path.normalize(__dirname + '/../')
const router = express.Router()
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var UserController = require('../controllers/user.controllers')
// Get all subscribers
router.get('/', UserController.getAll)
// Get one subscriber
router.get('/:id', UserController.getUser, UserController.getOne)
// Create one subscriber
router.post('/', UserController.post)
// router.post('/uploadphoto', upload.single('picture'), (req, res) => {
//     var img = fs.readFileSync(req.file.path);
//  var encode_image = img.toString('base64');
//  // Define a JSONobject for the image attributes for saving to database
//  var finalImg = {
//     contentType: req.file.mimetype,
//     image:  new Buffer(encode_image, 'base64')
//  };
// db.collection('quotes').insertOne(finalImg, (err, result) => {
//     console.log(result)

//   if (err) return console.log(err)

//   console.log('saved to database')

//   res.redirect('/')
// })
// })
// router.get('/photo/:id', (req, res) => {
//     var filename = req.params.id;
    
//     db.collection('mycollection').findOne({'_id': ObjectId(filename) }, (err, result) => {
    
//         if (err) return console.log(err)
    
//        res.contentType('image/jpeg');
//        res.send(result.image.buffer)
      
       
//       })
//     })
 // Update one subscriber
router.patch('/:id', UserController.getUser, UserController.update)
// Get one subscriber
router.delete('/:id', UserController.getUser, UserController.remove)
module.exports = router