const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
  account: {
    type: String,
    required: [true, 'Please add account type']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
  },
  category: {
    type: String,
    required: [true, 'Please add category']
  },
  note: {
    type: String,
    required: [false, 'Please add note']
  },
  incurred_on: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}
);

module.exports = mongoose.model('Transaction', transactionSchema);