import axios from 'axios';

const API_URL = '/api/transactions/';

// Create new transaction
const addTransaction = async (transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }
  const response = await axios.post(API_URL, transactionData, config);
  return response.data
}

// Get user transactions
const getTransactions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// Update user transaction
const updateTransaction = async (transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const id = transactionData._id
  const updateData = {
    text: transactionData.text,
    amount: transactionData.amount
  }

  const response = await axios.put(API_URL  + id , updateData, config)

  return response.data
}

// Delete user transaction
const deleteTransaction = async (transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + transactionId, config)
  return response.data
}

const transactionService = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
}

export default transactionService
