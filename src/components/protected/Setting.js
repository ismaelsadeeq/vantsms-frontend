import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/fund.css'


function Setting() {
  const {account,showLinks} = useGlobalContext()
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
         <div className="setting">
          
         </div>
       </div>
      </div>
  )
}

export default Setting
