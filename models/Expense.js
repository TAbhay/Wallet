const mongoose = require("mongoose");
const User     = require("../models/User");
const expenseSchema = new mongoose.Schema({ 
    title:{
        type:String,
        required: [true, "can't be blank"],
    },
    amount:{
        type:Number,
        required: [true, "can't be blank"],
    },
    category:{
        type:String,
        required: [true, "can't be blank"],
    },
    notes:{
        type:String,
    },
    expenseDate: {
        type: Date,
        default: Date.now
       },
    entered_by:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
    },
    {  timestamps:true  }
);

const Expense = mongoose.model("Expense",expenseSchema);
module.exports = Expense;