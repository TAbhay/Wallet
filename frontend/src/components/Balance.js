import { numberWithCommas } from '../utils/format';
import { useSelector } from 'react-redux';
export const Balance = () => {
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

  const total = (parseFloat(income) + parseFloat(expense)).toFixed(2);

  return (
    <>
      <h5>Your Balance</h5>
      <h2>₹ {numberWithCommas(total)}</h2>
    </>
  )
}
