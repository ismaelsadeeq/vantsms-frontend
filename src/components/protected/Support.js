import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import { useHistory } from "react-router-dom";
import TransactionModal from "./TransactionModal"
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/kyc.css'
const helpers = require('./helpers');


function Support() {

  let history = useHistory();

  const {
    showLinks,
    openModal,
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
          <p>{account}</p>
          </div>
        </div>
        <div className="margin"></div>
        <div className={ `${showLinks?"hid":"kyc"}`}>
            <h4 className="text-me">Do you have something in mind you think we should know</h4>
            <p>feel free to reach out</p>
            <form>
              <textarea type="text" rows="8" placeholder="Whats on your mind" required ></textarea>
              <button className="view-btn btn send">
                Send Message
              </button>
            </form>
            <button className="view-btn reply btn" onClick={openModal}>
              Show support replies
            </button>
        </div>
      </div>
      <TransactionModal />
    </div>
  )
}

export default Support
