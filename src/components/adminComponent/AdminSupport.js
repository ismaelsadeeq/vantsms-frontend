import React,{useEffect,useState} from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context/context'
import {url} from '../url'
import axios from "axios";
function AdminSupport({props}) {
  const {isModalOpen,token,closeModal} = useGlobalContext();
  const [user, setUser] = useState(null);
  const [kycStatus,setKycStatus] = useState(null);
  const [kyc,setKyc] = useState(null);
  const [reply,setReply] = useState(null);

  const getUser = () =>{
    axios({
      method: 'GET',
      url: `${url}/admin/users/${props.userId}`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data);
      if(response.data){
        return setUser(response.data)
      }
    })
    .catch(error=>{
      console.log(error);
    })
    axios({
      method: 'GET',
      url: `${url}/kyc/${props.id}`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data);
      if(response.data.data){
        setKyc(response.data.data);
        return setKycStatus(true);  
      }
      setKycStatus(false);
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const submitHandler =(e)=>{
    e.preventDefault()
    console.log(reply)
    axios({
      method: 'PUT',
      url: `${url}/admin/support/${props.id}`,
      data:{
        reply:reply
      },
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data);
      if(response.data.msg==="replied"){
        alert("message replied");
        setKyc();
        return closeModal();  
      }
      setKycStatus(false);
    })
    .catch(error=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    getUser()
  },[token])
  return <div className={`${isModalOpen?'modal-overlay show-modal':'modal-overlay'}`}>
            <div className='modal-container'>
              <div>
                <h4> {user?user.firstname +" "+ user.lastname:"something went wrong"}</h4>
                <p className="zero">{user?user.email:""}</p>
                {kycStatus?
                  <p>uploaded</p>
                :"kyc not uploaded"}
              </div>
              <p>
                <h5>Message</h5>
                {props.message?props.message:null}
              </p>
            <div>
            </div>
            <textarea name="supportReply" rows="4" value={reply} className="adminSupport" placeholder="write here" onChange={(e)=>{setReply(e.target.value)}} required />
          
            <button className="btn view-btn margin-btn" onClick={(e)=>{
              submitHandler(e)
            }}>
              reply
            </button >
              <button className='close-modal-btn' onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
          </div>
}

export default AdminSupport
