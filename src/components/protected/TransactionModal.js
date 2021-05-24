import React,{useEffect,useState} from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context/context'
import {url} from '../url'
import axios from "axios";
const TransactionModal = () => {
  const {isModalOpen,token,closeModal,getReplies} = useGlobalContext();
  const [supportData,setSupportData] = useState([]);

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
        return setSupportData(response.data.data)
      }
      return setSupportData([]);
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
        supportData.length>1?<div>
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
           <p>oops you did not send a message</p>
        </div>
      }
     
      <button className='close-modal-btn' onClick={closeModal}>
        <FaTimes />
      </button>
    </div>
  </div>
}

export default TransactionModal
