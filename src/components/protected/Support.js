import React, {useState} from 'react'
import Sidebar from './Sidebar'
import TransactionModal from "./TransactionModal"
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/kyc.css'


function Support() {
  const {showLinks,openModal} = useGlobalContext()
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
        <div className="kyc">
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
