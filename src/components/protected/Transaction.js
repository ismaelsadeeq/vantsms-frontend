import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import {url} from '../url';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/transaction.css'
const helpers = require('./helpers');


function Transaction() {
  let history = useHistory();
  const {
    showLinks,
    account,
    user,
    token,
    setToken,
    setTheUser,
    setTheKycStatus,
    setAccountBalance
  } = useGlobalContext()
  const [profilePic,setProfilePic] = useState(false)
  const [count,setCount] = useState(0)
  const [transaction,setTransaction] = useState([])

  const setTheToken = () =>{
    setToken(helpers.getToken());
    if(helpers.getToken() == null){
      history.push("/login")
    }
  }
  const getTransactions = ()=>{
    axios({
      method: 'GET',
      url: `${url}/transaction?currentPage=${count}&pageLimit=4`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data)
      setTransaction(response.data);
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
    getTransactions()
    console.log(user.firstname)
    console.log(account)
  }, [token,count])
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
        <div className={`${showLinks?"hid":"transaction"}`}>
          <div>
            <div className="transaction-content grey">
              <p>Date</p>
              <p>Type</p>
              <p>Amount</p>
            </div>
            {
              transaction.map((data)=>{
                const {id,createdAt,trxType,amount} = data
                return <div key={id} className="transaction-content">
                  <p>{createdAt}</p>
                  <p>{trxType}</p>
                  <p>{amount}</p>
                </div>
              })
            }
            <div className="transaction-btn">
            <button className="view-btn btn btn-danger">
              back
            </button>
            <button className="view-btn btn ">
              next
            </button>
            </div>
          </div>
        </div>
     </div>
    </div>
  )
}

export default Transaction
