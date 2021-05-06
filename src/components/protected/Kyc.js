import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import { CgProfile } from 'react-icons/cg';
import { FiCornerDownRight } from 'react-icons/fi';

import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/kyc.css'

function Kyc() {
  const {showLinks,account} = useGlobalContext()
  const [profilePic,setProfilePic] = useState(false);
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
         <div className={ `${showLinks?"hid":"kyc"}`}>
          <div>
            <h4 className="text-me">Upload Your <span className="text"> Corporate Affairs Certificate</span> for Account Validation</h4>
            <form>
            <input type="file" className="cac" />
            <button className="view-btn btn">
              upload
            </button>
            </form>
            
          </div>
          {/* <div>
            <h4 className="text-me">Yay!!!  Your <span className="text"> Corporate Affairs Certificate</span>  is Validated</h4>
            <p>go to your profile</p>
            <button className="view-btn btn">
              <FiCornerDownRight />
            </button>
          </div> */}
           {/* <div>
            <h4 className="text-me"> Your <span className="text"> Corporate Affairs Certificate</span> Validation failed</h4>
            <h4 className="text-me">No worries you can upload again</h4>
            <form>
            <input type="file" className="cac" />
            <button className="view-btn btn">
              upload
            </button>
            </form>
          </div> */}
          {/* <div>
            <h4 className="text-me">Your <span className="text"> Corporate Affairs Certificate</span>  is uploaded <br></br>awaiting validation</h4>
            <p>go to your profile</p>
            <button className="view-btn btn">
              <FiCornerDownRight />
            </button>
          </div> */}
         </div>
       </div>
      </div>
  )
}

export default Kyc
