import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/fund.css'
import phone from "../assets/images/verified2.svg"

function Fund() {
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
       <div className="fund">
         <div className="group">
         <h3 className="text-me">Account Number: 1234567890</h3>
          <h3  className="text-me">Account Name: Abubakar Sadiq Ismail</h3>
          <h3  className="text-me">Bank: Moniepoint</h3>
          <p className="lead">to fund your account simply transfer or deposit money<b></b> to the above account</p>
         </div>
         <div className="fund-img">
           <img src={phone}  className="img-fluid "/>
         </div>
       </div>
     </div>
    </div>
  )
}

export default Fund
