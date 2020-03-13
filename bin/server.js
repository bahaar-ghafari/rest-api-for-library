// include all of the dependencies
const express = require('express')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override')
const app = require('../app')
const mongoose = require('mongoose')
const guard = require('../middlewares/guard')
  // mongod
  // npm run devStart
require('dotenv').config()

const router = express.Router()
module.exports = router
// The first line allows us to connect to the database using Mongoose.
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
  res.sendFile(__dirname + '../index.html');

});
const authRouter = require('../routes/auth.routes');
app.use('/api/v1',authRouter );
const userRouter = require('../routes/user.routes')
// app.use('/api/v1/users',guard, userRouter)
app.use('/api/v1/users', userRouter)
const bookRouter = require('../routes/book.routes')
app.use('/api/v1/book', bookRouter)
const buyBookRouter = require('../routes/buyBook.routes')
app.use('/api/v1/buyBook', buyBookRouter)
// test and make sure our server is working
app.listen(3005, () => console.log('server started:D'))