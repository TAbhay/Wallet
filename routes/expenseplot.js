const express = require("express");
const router  = express.Router();

const { plotExpense } = require("../controllers/expenseplot");
const { isLoggedIn }  = require("../middleware/auth");

