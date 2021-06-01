const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isLoggedIn = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    console.log("here");
    jwt.verify(bearerToken,process.env.secretKey,function(err, decodedtoken){
      if(err){
        console.log(err);
      }
      else{
        req.User = decodedtoken;
        next();
      }
    });
    }
    else{
    // Forbidden
   
    res.sendStatus(403);
  }
};

exports.isAdmin = (req, res, next) => {
  var user = req.User.role;
  console.log(user);
  if (user != 1) {
    console.log("Not Admin");
    res.json({ message: "Admin restrictions" });
  }
  next();
};
