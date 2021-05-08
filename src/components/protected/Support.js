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
  let supportData = {
    support:""
  }
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
  const [data,setData] = useState(supportData)
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
      data: data,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data)
      if(response.data.status === 'success'){
        
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
  function changeHandler (e){
    const property = e.target.name;
    const value = e.target.value;
    supportData(ev => ({
      ...ev,
      [property] : value,
    }))  
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
              <textarea type="text" name="support" rows="8" value={supportData.support} onChange={(e)=>{changeHandler(e)}}  placeholder="Whats on your mind" required ></textarea>
              <button type="submit" className="view-btn btn send">
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
