import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import { useHistory } from "react-router-dom";
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import {FaMoneyBill} from 'react-icons/fa'
import {BiArchiveOut,BiUserCheck} from 'react-icons/bi'
import {RiNumbersLine} from 'react-icons/ri'
import {IoIosHelpCircleOutline} from 'react-icons/io'
import {RiShieldKeyholeLine} from 'react-icons/ri'
const helpers = require('./helpers');



function Dashboard() {
  let history = useHistory();
  const {
    showLinks,
    user,
    setUser,
    token,
    setToken,
    account,
    setAccount,
    kycStatus,
    setTheUser,
    setKycStatus,
    setAccountBalance,
    setTheKycStatus
  } = useGlobalContext();
  const [profilePic,setProfilePic] = useState(false);
  const setTheToken = () =>{
    setToken(helpers.getToken());
    if(helpers.getToken() == null){
      history.push("/login")
    }
  }
  useEffect(() => {
    setAccountBalance();
    setTheKycStatus();
    setTheUser();
    setTheToken();
    console.log(user.firstname)
    console.log(account)
  }, [token])

  return (
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
        <div className={`${showLinks?"hid dashContainer-body":"dashContainer-body"}`}>
          <div className="dash-content">
           <div>
            <FaMoneyBill />
           </div>
           <p>
            Account Balance
           </p>
           <h4>
           {account?<h4>{account}</h4>:<h4>0.00</h4>}
           </h4>
          </div >
          <div className="dash-content">
           <div>
            <BiArchiveOut />
           </div>
           <p>
            Kyc Status
           </p>
           <div>
            {
              kycStatus? <h4>uploaded</h4>:
                <h4>not uploaded
                <a href="/kyc">  upload</a>
                </h4>
            }
           </div>
          </div >
          <div className="dash-content">
           <div>
            <RiShieldKeyholeLine />
           </div>
           <p>
            API key
           </p>
           <h4>
           <a href="/profile">Go to profile</a>
           </h4>
          </div >
          <div className="dash-content">
           <div>
            <BiUserCheck />
           </div>
           <p>
            Account Type
           </p>
           <div>
              {
                user.isCorporate?<h4>Enterprise</h4>:<h4>Hobbyist</h4>
              }
           </div>
          </div >
          <div className="dash-content">
           <div>
            <RiNumbersLine />
           </div>
           <p>
           Pricing
           </p>
           <div>
              {
                user.isCorporate?<h4>10N/SMS</h4>:<h4>12.5N/SMS</h4>
              }
           </div>
          </div >
          <div className="dash-content">
           <div>
            <IoIosHelpCircleOutline />
           </div>
           <p>
            Need Support
           </p>
           <a href="/support" className="btn btn-succes">
            Send a message 
           </a >
          </div >
        </div>
     </div>
    </div>
  )
}

export default Dashboard
