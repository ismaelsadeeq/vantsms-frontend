import React,{useState} from 'react';
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context/context'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {url} from '../url';

function User({user,kyc,status,certlength}) {
  let history = useHistory();
  const {isUserOpen,token,closeUser,setGetUser} = useGlobalContext();

  const verifyHandler = () =>{
    axios({
      method: 'POST',
      url: `${url}/admin/verify-kyc/id/${kyc.id}`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data);
      if(response.data.message=="kyc verified"){
        alert("kyc verified");
        history.push('/kyc');
        return closeUser()
      }
      alert("something went wrong")
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const unverifyHandler = () =>{
    axios({
      method: 'PUT',
      url: `${url}/admin/unverify-kyc/${kyc.id}`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data);
      if(response.data.msg =="kyc unverified"){
        alert("kyc unverified");
        history.push("kyc");
        return closeUser()
      }
      alert("something went wrong")
    })
    .catch(error=>{
      console.log(error);
    })
  }
  return <div className={`${isUserOpen?'modal-overlay show-modal':'modal-overlay'}`}>
    <div className='modal-container'>
      <h4> {user?user.firstname +" "+ user.lastname:"something went wrong"}</h4>
      <p>{user?user.email:""}</p>
      {status?
       <div>
         <p>uploaded</p>
         <p><a target="_blank" href={`http://127.0.0.1:8081/${kyc?kyc.caCertificate.slice(6,certlength):null}`} className="btn view-btn">view</a></p>
         {kyc?<div> {kyc.isVerified?<p><button className="btn view-btn" onClick={()=>{unverifyHandler()}}>unverify</button></p>:
          <p><button className="btn view-btn" onClick={()=>{verifyHandler()}}>verify</button></p>
         }</div>:null}
       </div>
      :"not uploaded"}
      <button className='close-modal-btn' onClick={closeUser}>
        <FaTimes />
      </button>
    </div>
  </div>
}

export default User
