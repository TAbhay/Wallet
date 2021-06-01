const Expense = require("../models/Expense");
const mongoose = require("mongoose");
exports.expensebyId = async (req,res,next,id) =>
{
    try
    {
      const foundExpense = await Expense.findById(id);
      if(!foundExpense)
      {
          console.log("expense not found");
          return;
      }
      req.Expense = foundExpense;
      next();
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
        return;
    }
}
exports.createExpense = async (req,res) => 
{
    try
    {   const { title,amount,category,notes } = req.body.expense;
        const newExpense = {
            title: title,
            amount: amount,
            category: category,
            notes: notes,
            entered_by:req.User._id,
        } 
     const expense = new Expense(newExpense);
     const result  = await expense.save();
     if(!result)
     {
         res.json({message:"Something bad happened"});
         return;
     }
     res.json(result);
    }
    catch(err)
    {   
        console.log(err);
        res.status(500).json(err);
        return;
    }
}

exports.getExpense = async (req,res) => 
{
     try
     {
        const id = req.User._id;
        const expense = await Expense.find({entered_by:id});
        if(!expense)
        {
            res.json({message:"not found"});
        }
        const AvgCategory = { 'Food':0,'Housing':0,'Medicine':0,'Netflix': 0 ,'Gaming' : 0 , 'Rest' : 0} ;
        const TotalCategory = { 'Food':0,'Housing':0,'Medicine':0,'Netflix': 0 ,'Gaming' : 0 , 'Rest' : 0};
        const CountCategory = { 'Food':0,'Housing':0,'Medicine':0,'Netflix': 0 ,'Gaming' : 0 , 'Rest' : 0};
        expense.forEach( (value) => {
             TotalCategory[value.category] += value.amount;
             CountCategory[value.category] += 1;
        });
        for(let key in AvgCategory){
            AvgCategory[key] = TotalCategory[key] / CountCategory[key];
        }
        res.status(200).json({expense,AvgCategory,TotalCategory});
     }
     catch(err)
     {
        console.log(err);
        res.status(500).json(err);
        return;
    }

}

exports.updateExpense = async (req,res) =>
{
    const id = req.params.expenseId;
    console.log(req.body.expense);
    try
    {
      if(req.User._id == req.Expense.entered_by._id)     // if user_id form token and post_id matches then update ....
      {
       const updatedExpense = await Expense.findByIdAndUpdate(id,req.body.expense,{new:true});
       if(!updatedExpense){
        res.status(400).json({ error: 'Not found' });
       }
       res.json(updatedExpense);
        
      }
      else
      {
          res.json({message:"Unauthorized"});
      }
    } 
   catch(err)
   {
    console.log(err);
    res.status(500).json(err);
    return;
    }
}

exports.deleteExpense = async (req,res) =>
{
    try
    {
        if(req.User._id == req.Expense.entered_by._id)
        {
          const expense = await Expense.findByIdAndDelete(req.params.expenseId);
          res.json({message:"Deleted",expense});
        }
        else
        {
            res.json({message:"Invaid Request"});
        }
        
    } 
    catch(err)
    {
       console.log(err);
       res.status(500).json(err);
       return;
    }
}

