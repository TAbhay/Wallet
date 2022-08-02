import { useState } from 'react'
import { addTransaction } from '../features/transactions/transactionSlice'
import { useDispatch } from 'react-redux'
import Modal from 'react-modal';

export const AddTransaction = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('');
  const [account, setAccount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [open, setOpen] = useState(false);
  const onSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      account,
      text,
      amount: +amount,
      note:note
    }
    dispatch(addTransaction(newTransaction));
  }
  const handleInputChangeAccount = (e) => { 
    setAccount(e.target.value);
  };
  const handleInputChangeCategory = (e) => { 
    setText(e.target.value);
  };
  const handleInputChangeNote = (e) => { 
    setNote(e.target.value);
  };
 
 
  const openModalAdd = () => {
    setOpen(true);
  }
  const closeModalAdd = () => {
    setOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <>
    <button onClick={openModalAdd} className="btn btn-block" >Add Transaction</button>
    <Modal
    isOpen={open}
    onRequestClose={closeModalAdd}
    style={customStyles}
    ariaHideApp={false}
  >
      <h3>Add new transaction</h3>
      <button onClick={closeModalAdd} className='close-btn'>x</button>
      <form onSubmit={onSubmit} style={{ marginBottom: '15px' }}>
        <label className="form-label" style={{ marginBottom: '15px' }}>Income or Expense</label>
        <select class="form-select form-control" name="transaction" onChange={handleInputChangeAccount} aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
        </select>
        <label className="form-label" style={{ marginBottom: '15px' }}>Category</label>
        <select class="form-select form-control" name="category" onChange={handleInputChangeCategory} aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Insurance">Insurance</option>
            <option value="Health">Health</option>
            <option value="Groceries">Groceries</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Donation">Donation</option>
            <option value="Apparel">Apparel</option>
            <option value="Gaming">Gaming</option>
            <option value="Investments">Investments</option>
            <option value="Salary">Salary</option>
            <option value="Internet">Internet</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Movies">Movies</option>
            <option value="Clothing">Clothing</option>
            <option value="Other">Other</option>
        
        </select>
        <label className="form-label" style={{ marginBottom: '15px' }}>Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." required />
        <label className="form-label" style={{ marginBottom: '15px' }}>
                   Notes
                  </label>
                  <textarea
                  style={{ marginBottom: '15px' }}
                    className="form-control"
                    type="text"
                    id="input"
                    name="note"
                    cols={40}
                    rows={3}
                    onChange={handleInputChangeNote}
                  />
        <button className="btn"  style={{ marginBottom: '25px' }}>Add</button>
      </form>
    </Modal>
    </>
  )
}
