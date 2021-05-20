import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import { useHistory } from "react-router-dom";
import TransactionModal from "./TransactionModal"
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import axios from "axios"
import {url} from "../url"
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
    getReplies
  } = useGlobalContext()
  const [profilePic,setProfilePic] = useState(false)
  const [support,setSupport] = useState("")
  const setTheToken = () =>{
    setToken(helpers.getToken());
    if(helpers.getToken() == null){
      history.push("/login")
    }
  }
  const submitHandler = (e)=>{
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${url}/support`,
      data: {"support":support},
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data)
      if(response.data.status === true){
        alert("message send we'll get back to you shortly")
        setSupport("")
      }
    })
    .catch(error=>{
      console.log(error);
    })
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
        <div className={ `${showLinks?"hid":"kyc"}`}>
            <h4 className="text-me">Do you have something in mind you think we should know</h4>
            <p>feel free to reach out</p>
            <form onSubmit={(e)=>{submitHandler(e)}}>
              <textarea type="text" name="support" rows="8" value={support} onChange={(e)=>{setSupport(e.target.value)}}  placeholder="Whats on your mind" required ></textarea>
              <button type="submit" className="view-btn btn send">
                Send Message
              </button>
            </form>
            <button className="view-btn reply btn"  onClick={openModal,getReplies}>
              Show support replies
            </button>
        </div>
      </div>
      <TransactionModal />
    </div>
  )
}

export default Support
