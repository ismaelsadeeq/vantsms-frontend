import React,{useEffect,useState} from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context/context'
import {url} from '../url'
import axios from "axios";
const TransactionModal = () => {
  const {isModalOpen,token,closeModal,getReplies} = useGlobalContext();
  const [supportData,setSupportData] = useState(null)
  const support = ()=>{
    axios({
      method: 'GET',
      url: `${url}/support?currentPage=0&pageLimit=4`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data);
      if(response.data.data){
        setSupportData(response.data.data)
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
  useEffect(() => {
    support()
  }, [token])
  return <div className={`${isModalOpen?'modal-overlay show-modal':'modal-overlay'}`}>
    <div className='modal-container'>
      {
        supportData?<div>
           <h3>Support replies</h3>
           {
             supportData.map((data)=>{
               const {id,support,supportReply} = data;
               return <div>
                 <p><h4>Message: </h4>{support}
                 <h4>Reply: </h4>
                 {supportReply?supportReply:"unreplied"}</p>
               </div>
             })
           }
        </div>:
        
        <div>
           <h3>No Replies yet</h3>
        </div>
      }
     
      <button className='close-modal-btn' onClick={closeModal}>
        <FaTimes />
      </button>
    </div>
  </div>
}

export default TransactionModal
