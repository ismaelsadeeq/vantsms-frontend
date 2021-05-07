import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import { useHistory } from "react-router-dom";
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/fund.css'
import phone from "../assets/images/verified2.svg"
const helpers = require('./helpers');

function Fund() {
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
  const [profilePic,setProfilePic] = useState(false)
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
        <div className="margin"></div>
       <div className={`${showLinks?"hid":"fund"}`} >
         <div className="group">
         <h3 className="text-me">Account Number: {user.accountNumber}</h3>
          <h3  className="text-me">Account Name: {user.firstname} {user.lastname}</h3>
          <h3  className="text-me">Bank: Moniepoint</h3>
          <h3 className="text-me">1k to 100k - 15N per SMS unit</h3>
          <h3 className="text-me">101k to 999k - 12.5N per SMS unit</h3>
          <h3 className="text-me">Above 1M Naira - 10N per SMS unit</h3>
          <p className="lead">to fund your account simply transfer or deposit money<b></b> to the above account</p>
         </div>
         <div className="fund-img">
           <img src={phone}  className="img-fluid "/>
         </div>
       </div>
     </div>
    </div>
  )
}

export default Fund
