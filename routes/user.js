const express = require("express");
const router  = express.Router();

const { allUser ,getUser , updateUser , deleteUser } = require("../controllers/user");
const {isLoggedIn , isAdmin }  = require("../middlewares/auth");  

router.get("/admin/alluser",isLoggedIn,isAdmin,allUser);  // To  Admin Only just for Fun ....
router.get("/user",isLoggedIn,getUser);
router.put("/user",isLoggedIn,updateUser);
router.delete("/user",isLoggedIn,deleteUser);

module.exports = router;