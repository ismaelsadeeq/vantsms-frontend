import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/sms.css'

function Sms() {
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
        <div className="margin"></div>
       <div className="sms-body">
          <div className="sendSMS">
            <h4>Send an instant Message</h4>
            <label>Reciepent</label>
            <input type="text" placeholder="e.g 0813******" required />
            <div><label>message</label></div>
            <textarea type="text" placeholder="Enter your message here" rows="7" colomn="20" required />
          </div>
          <div className="smsHistory">
            <p>SMS History</p>
            <button className="btn view-btn">view</button>
          </div>
       </div>
     </div>
    </div>
  )
}

export default Sms
