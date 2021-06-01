const express = require("express");
const router  = express.Router();
const { expensebyId,
        createExpense,
        getExpense,
        updateExpense,
        deleteExpense,       } = require("../controllers/expense");
const { isLoggedIn } = require("../middlewares/auth");

router.param("expenseId",expensebyId);
router.get("/expense/",isLoggedIn,getExpense);
router.post("/expense/new",isLoggedIn,createExpense);
router.put("/expense/:expenseId",isLoggedIn,updateExpense);
router.delete("/expense/:expenseId",isLoggedIn,deleteExpense);



module.exports = router;