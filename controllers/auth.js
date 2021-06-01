const User = require("../models/User");
const jwt  = require("jsonwebtoken");

exports.signUp = async (req,res) => {
    try {

        const user = new User(req.body);
        const email = user.email;
        const isUser = await User.findOne({ email });
        if(isUser){
            // throw new Error("User already exists");
            res.json({message:"User already exists"});
            return;
        }
        if(!isUser)
        {
          const result = await user.save();
          console.log(result);
          res.json(result);
        }
       
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
}

exports.signIn = async (req, res) => {
    try{
    const {email, password} = req.body;
    const existUser = await User.findOne({email: email});
    if(!existUser){
        // throw new Error("User not found);
        res.status(400).json({message:"User not found"});
        return;
    }
    existUser.comparePassword(password,(err,result) =>{
       if(err || !result){
           res.status(400).json({message:"Please Enter correct Password"});
           return;
       }
       const payLoad = {
          _id : existUser._id,
          email : existUser.email,
          role  : existUser.role,
         };
      jwt.sign(payLoad,process.env.secretKey, { expiresIn: '2w' },(err, token)=> {
        if(err){
          console.log(err);
          return;
         }
        else{
          console.log(token);
          res.json(token);
          return;     
      }
      });
    });
    }
   catch(err){
    console.log(err);
    res.status(500).json(err);
    return; 
   }
}

