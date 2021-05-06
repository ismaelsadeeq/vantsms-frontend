import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/transaction.css'


function Transaction() {
  const {showLinks,account} = useGlobalContext()
  const [profilePic,setProfilePic] = useState(false)
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
        <div className="margin"></div>
        <div className={`${showLinks?"hid":"transaction"}`}>
          <div>
            <div className="transaction-content grey">
              <p>Date</p>
              <p>Type</p>
              <p>Amount</p>
            </div>
            <div className="transaction-content">
              <p>May 5</p>
              <p>Credit</p>
              <p>2000</p>
            </div>
            <div className="transaction-content">
              <p>April 1</p>
              <p>Debit</p>
              <p>1</p>
            </div>
            <div className="transaction-content">
              <p>April 4</p>
              <p>Debit</p>
              <p>1</p>
            </div>
            <div className="transaction-content">
              <p>April 6</p>
              <p>Credit</p>
              <p>600</p>
            </div>
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
