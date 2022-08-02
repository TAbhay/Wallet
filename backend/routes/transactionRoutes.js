const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware')

router
  .route('/')
  .get(protect, getTransactions)
  .post(protect, addTransaction);

router
  .route('/:id')
  .delete(protect, deleteTransaction)
  .put(protect, updateTransaction);

module.exports = router;