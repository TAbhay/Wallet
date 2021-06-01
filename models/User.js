const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "can't be blank"],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    minlength: 16, 
  },
  role: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: "Password is required"
   },
   salt:String,
});
userSchema.pre("save", function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        this.salt = salt;
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(enteredPassword, cb) {
    bcrypt.compare(enteredPassword, this.password, function (err, result) {
        if (err) {
          return cb(err);
        }
        cb(null,result);
    });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
