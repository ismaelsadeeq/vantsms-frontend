import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import {FaMoneyBill} from 'react-icons/fa'
import {BiArchiveOut,BiUserCheck} from 'react-icons/bi'
import {RiNumbersLine} from 'react-icons/ri'
import {IoIosHelpCircleOutline} from 'react-icons/io'



function Dashboard() {
  const {showLinks} = useGlobalContext()
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
          <p>0.00</p>
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
              0.00
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
            number sent sms
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
             12N/SMS
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
