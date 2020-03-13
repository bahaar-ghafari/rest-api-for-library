
const controller = {};
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const privateKey = require('../config').secretKey;

controller.login = async (req, res) => {
  const { email, password } = req.headers;
  if (!email || !password) {
    return res.send({
      status: false,
      msg: 'Please provide the correct data'
    });
  } else {
    var user = await User.findOne({ email });
    if (!user) {
      return res.send({
        status: false,
        msg: 'No user found'
      });
    }
    else {
      // FOUND USER
      user.comparePassword(password, function (err, isMatch) {
        if (isMatch) {
          // JWT
          jwt.sign({ email: user.email }, privateKey, { expiresIn: '1h' }, function (err, token) {
            if (!err) {
              res.send({
                token
              });
            }
          });
        } else {
          console.log(err)
          res.send('ERROR LOGIN');
        }
      })
    }
  }
}

module.exports = controller;