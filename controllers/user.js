const User = require("../models/User");
 

exports.allUser = async (req, res) =>{    
    try{
        const Users = User.find({});
        if(!Users){
            res.status(404).json({message:"Okk"});
            
        }
        res.status(200).json(Users);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
        return;
    }
}
exports.getUser = async (req,res) => {
    try
    {
    const user = await User.findById(req.User._id);
    if(!user){
        res.json({message:"Error"});
        return;
    }
    res.json(user);
   }
   catch(err){
    console.log(err);
    res.status(500).json(err);
    return;
   }
}

exports.updateUser = async (req,res) => {
    try
    {
    const id = req.User._id;
    const user = await User.findById(id);
    if(!user){
        res.json({message:"Error"});
        return;
    }
    const body = req.body;
    const updatedUser = {
        username: body.username,    // for now changing username only
    }
    if(req.User.role==1){
        updatedUser.role = body.role;    // only Admin can update the roles.....
    }
    const updated = await User.findByIdAndUpdate(id,updatedUser);
    if(!updated){
        res.json({message:"Error"});
        return;
    }
    res.json(updated);
  }
  catch(err){
     console.log(err);
     res.status(500).json(err);
     return;
  }

}

exports.deleteUser= async (req,res) =>{
    try
    {
          await Expense.findByIdAndDelete(req.User._id);
          res.json({message:"Deleted"});
    } 
    catch(err)
    {
       console.log(err);
       res.status(500).json(err);
       return;
    }
}