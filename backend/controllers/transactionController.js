const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Transaction = require('../models/transactionModel');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public
const getTransactions = asyncHandler(async (req, res) => {

  const transactions = await Transaction.find({ user: req.user.id }).sort({$natural:-1});;
  return res.status(200).json(transactions);


})

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Public
const addTransaction = asyncHandler(async (req, res) => {
  const { account , text, amount , note } = req.body;
  const newTransaction = await Transaction.create({
    account: account,
    category:text,
    amount:amount,
    note:note,
    user: req.user.id
  });
  
  return res.status(201).json(newTransaction);


})

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {


  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return res.status(404).json({
      success: false,
      error: 'No transaction found'
    });
  }
  console.log(req.body);

  const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  return res.status(200).json(updatedTransaction)


});


// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Public
const deleteTransaction = asyncHandler(async (req, res) => {

  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404)
    throw new Error('No transaction found');
  }
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (transaction.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  await transaction.remove();

  return res.status(200).json({ id: req.params.id });

})


const showStats = async (req, res) => {
  let monthlySpending = await Transaction.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: {
          year: { $year: '$incurred_on' },
          month: { $month: '$incurred_on' },
        },
        totalAmount: { $sum: '$amount' },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlySpending = monthlySpending
    .map((element) => {
      let {
        _id: { year, month },
        totalAmount,
      } = element;
      if (month < 10) {
        month = '0' + month;
      }
      month = DateTime.fromISO(`${year}-${month}`).toFormat('MMM');
      date = month + ' ' + year;
      totalAmount = totalAmount.toFixed();
      return { year, month, totalAmount, date };
    })
    .reverse();

  res.json({ monthlySpending });
};



module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
}