import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import '../../Stylesheet/dashboard.css'
import profile from '../assets/images/me.jpg'
import Sidebar from './Sidebar'
import { CgProfile } from 'react-icons/cg';
import prof from '../assets/images/me.jpg'
import {useGlobalContext} from '../context/context'

function Profile() {

  let history = useHistory();
  const getLocalStorage = () =>{
    let user = localStorage.getItem('user')
    if(user){
      return JSON.parse(localStorage.getItem('user'))
    } else{
      return []
    }
  }
  const [profilePic,setProfilePic] = useState(false)
  const {remove,account,showLinks} = useGlobalContext();
  const [store,setStore] = useState(getLocalStorage())
  const [about,setAbout] = useState(true)
  const [api,setApi] = useState(false)
  const handleToggle = () => {
    setAbout(!about);
    setApi(!api)
  };

  return (
    <div className="box">
        <Sidebar className="second-box" />
    <section className={`${remove?"hid":"contain"}`}>
    <div className="contain emp-profile"> 
                <div className=" first ">
                    <div className="profile-img">
                        <img src={profile} alt=""/>
                        <div className="file btn btn-lg btn-primary">
                            Change Photo
                            <input type="file" name="file"/>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                        </div>
                    </div>
                </div>
                <div className="second">
                <div className="col-md-6">
                    <div className="profile-head">
                                <h5 className="rem">
                                    Sadeeq ismael
                                    {/* {{user?.firstname}} {{user?.lastname}} */}
                                </h5>
                                <h6 className="rem2">
                                    ask4ismailsadiq@gmail.com
                                    {/* {{user?.email}} */}
                                </h6>
                                <p className="proile-rating">SMS Balance : <span className="mr-4">{account.balance}</span> <a className="btn btn-small btn-success btn-outline"> Top Up Now</a> </p>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <button  onClick={()=>{handleToggle()}} className="nav-link" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true">About</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" type="button" onClick={()=>{handleToggle()}}  role="tab" aria-controls="profile" aria-selected="false">API Keys</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2">
                </div>
            
            <div className="row">
                <div className="col-md-4">

                </div>
                <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                        <div className={about? 'tab-pane fade show active':'tab-pane fade'} id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Account Type</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p >Company/organization</p>
                                            {/* <p>Individual</p> */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Verification</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Verified</p>
                                            {/* <p> Unverified <br /> Verify Now</p> */}
                                        </div>
                                    </div>
                                    <div className="roww">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>ask4ismailsadiq@gmail.com</p>
                                            {/* <p>{{user?.email}}</p> */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>08131354171</p>
                                            {/* <p>{{user?.phonenumber}}</p> */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Web Developer and Designer</p>
                                        </div>
                                    </div>
                        </div>
                        <div className={api? 'tab-pane fade show active':'tab-pane fade'} role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>API KEy</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>54678903-3483748390434</p>
                                            {/* <p>{{user?.apiKey}}</p> */}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Secret Key </label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>5467389204394834267839032</p>
                                            {/* <p>{{user?.apiSecret}}</p> */}
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>        
    </div>
</section>
</div>
  )
}

export default Profile
