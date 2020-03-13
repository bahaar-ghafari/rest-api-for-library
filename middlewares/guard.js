const jwt = require('jsonwebtoken');
const privateKey = require('../config').secretKey;

module.exports = (req, res, next) => {
  const { auth } = req.headers;
  if (!auth) {
    res.send('auth is incorrect');
  } else {
    jwt.verify(auth, privateKey, function(err, verified) {
      if (err){ 
        // console.log("err.message,verified",err.message,verified)
        res.send('AUTH ERROR');}
      if (verified) {
        next();
      }
    });
  }
}