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
import axios from 'axios';
import {url} from '../url';


const getToken = () =>{
  let list = localStorage.getItem('token')
  if(list){
    return JSON.parse(localStorage.getItem('token'))
  } else{
    return null
  }
}
const getUser = () =>{
  let list = localStorage.getItem('user')
  if(list){
    return JSON.parse(localStorage.getItem('user'))
  } else{
    return []
  }
}
function Dashboard() {
  let history = useHistory();
  const {
    showLinks,
    user,
    setUser,
    token,
    setToken,
    account,
    setAccount
  } = useGlobalContext();
  const [profilePic,setProfilePic] = useState(false)
  const setTheToken = () =>{
    setToken(getToken);
    if(token == null){
      history.push("/login")
    }
  }
  const setTheUser = () =>{
    setUser(getUser);
  }
  const setAccountBalance = ()=>{
    axios({
      method: 'get',
      url: `${url}/account`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }).then(response=>{
      console.log(response.data);
      if(response.data){
        let smsBalance = response.data.smsBalance
        setAccount(balance => ({
          ...balance,
          ["balance"]:smsBalance
        }))
        console.log(account)
      }
    })
    .catch(error=>{
      console.log(error); 
    })
  }
  useEffect(() => {
    setTheToken();
    setTheUser();
    setAccountBalance();
  }, [])

  return (
    <div className="dashContainer">
    <div className="">
        <Sidebar />
    </div>
    <div className="dashContainer-box">
        <div className="dashContainer-nav">
          <div className="dashContainer-nav-content">
          {profilePic? <img src={profile} className="avatar"/>:<div><CgProfile /></div>}
          <p>Abubakar</p>
          <p>{account.balance}</p>
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
           {account.balance}
           </h4>
          </div >
          <div className="dash-content">
           <div>
            <BiArchiveOut />
           </div>
           <p>
            Kyc Status
           </p>
           <h4>
             uploaded
           </h4>
          </div >
          <div className="dash-content">
           <div>
            <RiNumbersLine />
           </div>
           <p>
            sent messages
           </p>
           <h4>
              0
           </h4>
          </div >
          <div className="dash-content">
           <div>
            <BiUserCheck />
           </div>
           <p>
            Account Type
           </p>
           <h4>
              Hobbiyist
           </h4>
          </div >
          <div className="dash-content">
           <div>
            <IoIosHelpCircleOutline />
           </div>
           <p>
           Pricing
           </p>
           <h4>
             12.00N/SMS
           </h4>
          </div >
          <div className="dash-content">
           <div>
            <IoIosHelpCircleOutline />
           </div>
           <p>
            Need Support
           </p>
           <button className="btn btn-succes">
            Send a message 
           </button>
          </div >
        </div>
     </div>
    </div>
  )
}

export default Dashboard
