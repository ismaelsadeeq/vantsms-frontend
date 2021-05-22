import React,{useState} from 'react';
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context/context'
function User({user,kyc,status}) {
  const {isUserOpen,token,closeUser,setGetUser} = useGlobalContext();
  
  return <div className={`${isUserOpen?'modal-overlay show-modal':'modal-overlay'}`}>
    <div className='modal-container'>
      <h4> {user?user.firstname +" "+ user.lastname:"something went wrong"}</h4>
      <p>{user.email?user.email:""}</p>
      {status?
       <div>
         <p>uploaded</p>
         <p><a target="_blank" href={`http://127.0.0.1:8081/${kyc.caCertificate.slice(5)}`} className="btn view-btn">view</a></p>
         {kyc.isVerified?<p><button className="btn view-btn">unverify</button></p>:
          <p><button className="btn view-btn">verify</button></p>
         }
       </div>
      :"not uploaded"}
      <button className='close-modal-btn' onClick={closeUser}>
        <FaTimes />
      </button>
    </div>
  </div>
}

export default User
