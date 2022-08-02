import React from 'react';
import { numberWithCommas } from '../utils/format';
import { useSelector } from 'react-redux';
export const IncomeExpenses = () => {
  const {transactions} = useSelector(state => state.transactions)
  const amounts = transactions.map(transaction => ({amount:transaction.amount,account:transaction.account}));

  const income = amounts
    .filter(item => item.account === 'income')
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item.account === 'expense').reduce((acc, item) => (acc += item.amount), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
  <p className="money plus">₹ {numberWithCommas(income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
  <p className="money minus">₹ {numberWithCommas(expense)}</p>
        </div>
      </div>
  )
}
