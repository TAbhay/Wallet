import Modal from 'react-modal';
import { useState } from 'react';
import { updateTransaction } from '../features/transactions/transactionSlice'
import { useDispatch } from 'react-redux'

function Panel({modalIsOpen, closeModal, transaction}) {
  const [text, setText] = useState(transaction.category);
  const [account, setAccount] = useState(transaction.account);
  const [amount, setAmount] = useState(transaction.amount);
  const [note, setNote] = useState(transaction.note);
  const dispatch = useDispatch();

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

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      _id: transaction._id,
      account:account,
      text:text,
      amount: +amount,
      note:note
    }

    dispatch(updateTransaction(newTransaction));

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
  return (
    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    ariaHideApp={false}
  >
    <h3>Edit transaction</h3>
    <button onClick={closeModal} className='close-btn'>x</button>
  <form onSubmit={onSubmit}>
  <label className="form-label" style={{ marginBottom: '15px' }}>Income or Expense</label>
        <select class="form-select form-control" name="transaction" value={account} onChange={handleInputChangeAccount} aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
        </select>
        <label className="form-label" style={{ marginBottom: '15px' }}>Category</label>
        <select class="form-select form-control" name="category" value={text} onChange={handleInputChangeCategory} aria-label="Default select example">
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
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." required/>
        <label className="form-label" style={{ marginBottom: '15px' }}>
                   Notes
                  </label>
                  <textarea
                   style={{ marginBottom: '15px' }}
                    className="form-control"
                    type="text"
                    id="input"
                    name="note"
                    value={note}
                    cols={40}
                    rows={3}
                    onChange={handleInputChangeNote}
                  />
        <button className="btn"  style={{ marginBottom: '25px' }}>Update</button>
  </form>
  </Modal>
  )
}
export default Panel