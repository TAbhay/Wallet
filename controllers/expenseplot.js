const Expense = require("../models/Expense");

exports.plotExpense = async (req, res) => {

    // From a given Start Date To Given End Date
    
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m+1, 0);
    console.log(firstDay);
    console.log(lastDay);
    try 
    {
    const expense = await Expense.find({entered_by:req.User._id,expenseDate : {$gte : firstDay,$lte : lastDay}});
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
    console.log(totalMonthly);
    res.json(totalMonthly);
    } 
    catch (err){
    console.log(err)
    return res.status(400).json({message:"error"});
    }
}
