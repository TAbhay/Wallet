import React, { useState , useEffect , useMemo } from 'react';
import { useSelector } from 'react-redux';
import Pagination from 'react-responsive-pagination';
import { Transaction } from './Transaction';

export const TransactionList = () => {
  const {transactions} = useSelector(state => state.transactions)
  const [currentPage, setCurrentPage] = useState(1);
  const [total,setTotal] = useState(1)
  const [item,setItem] = useState([])
  // console.log(transactions)
  useEffect(() =>{
    // console.log("total",total)
    setTotal(Math.ceil(transactions.length/5))
    var strt = Math.max(0,5*(currentPage-1))
    var end = Math.max(5*(currentPage-1),currentPage*5)
    // console.log(strt,end)
    setItem(transactions.slice(strt,end))
    // console.log(transactionList)
  },[currentPage,transactions])

//  console.log(chart)
  return (
    <>
      <h3>History</h3>
      <ul className="list"> 
        {item.map(item => (<Transaction key={item._id} transaction={item} />))}
        <Pagination
          current={currentPage}
          total={total}
          onPageChange={setCurrentPage}
        />
      </ul>
      
    </>
  )
}
