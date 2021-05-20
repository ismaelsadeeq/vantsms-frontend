import React, {useState,useEffect} from 'react'
import Sidebar from '../protected/Kyc'
import { CgProfile } from 'react-icons/cg';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {url} from '../url';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/kyc.css';
const helpers = require('../protected/helpers');

function AdminKyc() {
  let history = useHistory();
  const {
    showLinks,
    account,
    user,
    token,
    setToken,
    setTheUser,
    setTheKycStatus,
    setAccountBalance,
    
  } = useGlobalContext()
  const [profilePic,setProfilePic] = useState(false);

  const setTheToken = () =>{
    setToken(helpers.getToken());
    if(helpers.getToken() == null){
     
      history.push("/login")
    }
  }
 
  const getUsers =  () =>{
    axios({
      method: 'GET',
      url: `${url}/users?currentPage=0&pageLimit=10`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }).then(response => {
      console.log(response.data);
      if(response.data.status === true){
        history.push('/admin-kyc')
      }
  
    })
    .catch(error=>{
      console.log(error); 
    })
  }
  
  useEffect(() => {
    setAccountBalance();
    setTheUser();
    setTheToken();
    console.log(user.firstname)
    console.log(account)
  }, [token])
  
  return ( // This is the Method that loads default because no Kyc is uploaded
      <div className="dashContainer">
      <div className="">
          <Sidebar />
      </div>
      <div className="dashContainer-box">
          <div className="dashContainer-nav">
            <div className="dashContainer-nav-content">
            {profilePic? <img src={profile} className="avatar"/>:<div><CgProfile /></div>}
            <p>{user.firstname}</p>
            {account?<p>{account}</p>:<p>0.00</p>}
            </div>
          </div>
          <div className="margin"></div>
         <div className={ `${showLinks?"hid":"kyc"}`}>
          <div>
            
          </div>
         </div>
       </div>
      </div>
  )
}

export default AdminKyc
