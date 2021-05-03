import React, {useState} from 'react'
import Sidebar from './Sidebar'
import profile from '../assets/images/me.jpg'

function Dashboard() {


  return (
    <div className="dashContainer">
    <div className="dashCotainer-side">
        <Sidebar />
    </div>
    <div className="dashContainer-box">
        <div className="dashContainer-nav">
          <div className="dashContainer-nav-content">
          <img src={profile} className="avatar"/>
          <p>Abubakar</p>
          <p>0.00 Sms balance</p>
          </div>
        </div>
        <div className="dashContainer-body">
          <div>
            
          </div>
          <div>
            hello
          </div>
          <div>
            hello
          </div>
         
        </div>
     </div>
    </div>
  )
}

export default Dashboard
