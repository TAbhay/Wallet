const { faker } = require('@faker-js/faker');
const UserSchema = require('../models/userModel');
const ExpenseSchema = require('../models/transactionModel');
const bcrypt = require("bcryptjs")

const createRandomExpense = (category, userId, account) => {
    return {
      account: account,
      category: category,
      amount: faker.finance.amount(),
      note: faker.random.words(),
      user: userId,
    };
  };
  

const createRandomUserAcc = async (req, res) => {
    // create random user
    const userName = faker.name.firstName() 
    const userData = {
      name: userName,
      email: faker.internet.email(userName),
      password: bcrypt.hashSync('123456',12),
    };
    const user = await UserSchema.create(userData);
    // create category
    const CATEGORY = [
        "Housing",
        "Transportation",
        "Insurance",
        "Health",
        "Groceries",
        "Restaurants",
        "Entertainment",
        "Education",
        "Donation",
        "Apparel",
        "Gaming",
        "Investments",
        "Salary",
        "Internet",
        "Electricity",
        "Water",        
        "Movies",
        "Clothing",
        "Other"
    ]
    const ACCOUNT = [
        "expense",
        "income",
    ]
    
     
    const pastExpensesAmount = 50;
    for (let idx = 0; idx < pastExpensesAmount; idx++) {
      const randomCategory = CATEGORY[Math.floor(Math.random()*CATEGORY.length)];
      const randomAccount = ACCOUNT[Math.floor(Math.random()*ACCOUNT.length)];
      const result = createRandomExpense(randomCategory, user._id,randomAccount);
      await ExpenseSchema.create(result);
    }
  
    return res.status(200).json({
        userData,
        password:'123456'
    });
  };

  
module.exports = {
    createRandomUserAcc
  }