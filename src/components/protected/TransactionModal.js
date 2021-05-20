import React,{useEffect,useState} from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context/context'
const TransactionModal = () => {
  const {isModalOpen,token,closeModal,getReplies} = useGlobalContext();
  
  useEffect(() => {
    
  }, [])
  return <div className={`${isModalOpen?'modal-overlay show-modal':'modal-overlay'}`}>
    <div className='modal-container'>
      <h3>Support replies</h3>
      <button className='close-modal-btn' onClick={closeModal}>
        <FaTimes />
      </button>
    </div>
  </div>
}

export default TransactionModal
