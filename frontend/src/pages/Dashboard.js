import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getTransactions, reset } from '../features/transactions/transactionSlice'

import { Balance } from '../components/Balance';
import { IncomeExpenses } from '../components/IncomeExpenses';
import { TransactionList } from '../components/TransactionList';
import { TransactionCharts } from '../components/charts';
import { AddTransaction } from '../components/AddTransaction';

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { user } = useSelector((state) => state.auth)
  const [chart, setChart] = useState(false)
  const [hist, setHist] = useState(true)
  const { isLoading, isError, message } = useSelector(
    (state) => state.transactions
  )


  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }
    dispatch(getTransactions())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return
  }
  const handleChart = () => { 
    setChart(true) 
    setHist(false)
    // console.log(chart,"chart")
   }
  const handleHistory = () => { 
    setHist(true)
    setChart(false)
    // console.log(chart,"Hist")
   }
  return (
    <>
      {
        isLoading ? <Spinner /> :
          <>
            <section className='heading'>
              <h3>👋 Welcome {user && user.name}</h3>
              <Balance />
            </section>
            <IncomeExpenses />
            <section>
              <AddTransaction />
            </section>
            <section className='content'>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button onClick={handleHistory} style={{ marginRight: '5px' }} className="btn btn-block">History</button>
                <button onClick={handleChart} style={{ marginLeft: '5px' }}  className="btn btn-block">Charts</button>
              </div>
              <>
              {
                chart && <TransactionCharts  /> 
              }
              </>
              <>
              {
                hist &&  <TransactionList  />
              }
              </>
             
            </section>

          </>
      }
    </>

  )
}

export default Dashboard
