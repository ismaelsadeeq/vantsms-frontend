import React, {useState} from 'react'
import Sidebar from './Sidebar'
import { FaBars } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';

import profile from '../assets/images/me.jpg'

function Dashboard() {
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
          <p>0.00 Sms balance</p>
          </div>
        </div>
        <div className="dashContainer-body">
          <div className="dash-content">
           <div>
            <FaBars />
           </div>
           <p>
            Account Balance
           </p>
           <h4>
              0.00
           </h4>
          </div >
          <div className="dash-content">
            hello
          </div>
          <div className="dash-content">
            hello
          </div>
        
        </div>
     </div>
    </div>
  )
}

export default Dashboard
