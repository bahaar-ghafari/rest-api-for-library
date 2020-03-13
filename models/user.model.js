const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const User = new mongoose.Schema({
    type: {
      type: String,
      required: '{PATH} is required!',
      default:"user"
    },
    name: {
        type: String,
        required: false
      },
    family: {
        type: String,
        required: false,
      },
    age: {
        type: Number,
        required: false,
      }, 
    email: {
      type: String,
      required: true,
    },
    password: {
      type: Number,
      required: true,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
      }],
    avatar: {
        type: String,//*************** */
        required: false
      }
  })
  User.methods.comparePassword = function(password, cb){
    const user = this;
    bcrypt.compare(password, user.password, function(err, isMatch) {
// console.log("password,user.password,ismatch",password,user.password,isMatch)
      if (!isMatch) {
        cb(null, !isMatch);
      } else {
        cb('not match passes', false);
      }
    });
  };
  

  // User.pre('save', function(next){
  //   const user = this;
  //   bcrypt.genSalt(10, function(error, salt){
  //     if (error) {
  //       next(error);
  //     }
  //     bcrypt.hash(user.password, salt,async function(error, encyptedPassword){
  //       console.log("encyptedPassworddddddd",encyptedPassword)
  //       user.password = encyptedPassword;
  //       next();
  //     });
  //   })
  // })
// exporting our subscriber schema
// ‘Subscriber’ is the name we want to give the model in our database
module.exports = mongoose.model('User', User)