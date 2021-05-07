import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import { CgProfile } from 'react-icons/cg';
import { useHistory } from "react-router-dom";
import { FiCornerDownRight } from 'react-icons/fi';
import axios from 'axios';
import {url} from '../url';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/kyc.css'
const helpers = require('./helpers');


function Kyc() {
  let history = useHistory();
  const data = {
    caCertificate:'',
    cacNo:'',
  }
  const {
    showLinks,
    account,
    user,
    token,
    setToken,
    setTheUser,
    setTheKycStatus,
    setAccountBalance,
  } = useGlobalContext()
  const [info, setInfo] = useState(data);
  const [profilePic,setProfilePic] = useState(false);
  const [kycDetails,setKycDetails] = useState("");

  const setTheToken = () =>{
    setToken(helpers.getToken());
    if(helpers.getToken() == null){
      history.push("/login")
    }
  }
  function changeHandler (e){
    const property = e.target.name;
    const value = e.target.value;
    setInfo(ev => ({
      ...ev,
      [property] : value,
    }))  
  }
  const kyc =()=>{
    axios({
      method: 'GET',
      url: `${url}/kyc`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }).then(response => {
      console.log(response.data);
      if(response.data.data === null){
        return setKycDetails("null");
      }
      if(response.data.data.caCertificate === !null){
        return setKycDetails("uploaded");
      }
      if(response.data.data.isVerified === true){
        return setKycDetails("verified");
      }
      if(response.data.data.isVerified === false){
        return setKycDetails("failed");
      }
    })
    .catch(error=>{
      console.log(error); 
    })
  }
  function submitHandler (e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${url}/kyc`,
      data: info,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data)
      if(response.data.status === 'success'){
        
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
  useEffect(() => {
    setAccountBalance();
    kyc()
    setTheUser();
    setTheToken();
    console.log(user.firstname)
    console.log(account)
  }, [token])
  
  if(kycDetails =="uploaded"){
    return (
      <div className="dashContainer">
      <div className="">
          <Sidebar />
      </div>
      <div className="dashContainer-box">
          <div className="dashContainer-nav">
            <div className="dashContainer-nav-content">
            {profilePic? <img src={profile} className="avatar"/>:<div><CgProfile /></div>}
            <p>{user.firstname}</p>
            {account?<p>{account}</p>:<p>0.00</p>}
            </div>
          </div>
          <div className="margin"></div>
         <div className={ `${showLinks?"hid":"kyc"}`}>
         <div>
          <h4 className="text-me">Your <span className="text"> Corporate Affairs Certificate</span>  is uploaded <br></br>awaiting validation</h4>
          <p>go to your profile</p>
          <button className="view-btn btn">
             <FiCornerDownRight />
          </button>
      </div>
         </div>
       </div>
      </div>
       
    )
  }
  if(kycDetails =="verified"){
    return (
      <div className="dashContainer">
      <div className="">
          <Sidebar />
      </div>
      <div className="dashContainer-box">
          <div className="dashContainer-nav">
            <div className="dashContainer-nav-content">
            {profilePic? <img src={profile} className="avatar"/>:<div><CgProfile /></div>}
            <p>{user.firstname}</p>
            {account?<p>{account}</p>:<p>0.00</p>}
            </div>
          </div>
          <div className="margin"></div>
         <div className={ `${showLinks?"hid":"kyc"}`}>
         <div>
          <h4 className="text-me">Yay!!!  Your <span className="text"> Corporate Affairs Certificate</span>  is Validated</h4>
            <p>go to your profile</p>
            <button className="view-btn btn">
              <FiCornerDownRight />
            </button>
          </div>
         </div>
       </div>
      </div>
      
    )
  }
  if(kycDetails =="failed"){
    return (
      <div className="dashContainer">
      <div className="">
          <Sidebar />
      </div>
      <div className="dashContainer-box">
          <div className="dashContainer-nav">
            <div className="dashContainer-nav-content">
            {profilePic? <img src={profile} className="avatar"/>:<div><CgProfile /></div>}
            <p>{user.firstname}</p>
            {account?<p>{account}</p>:<p>0.00</p>}
            </div>
          </div>
          <div className="margin"></div>
         <div className={ `${showLinks?"hid":"kyc"}`}>
         <div>
            <h4 className="text-me"> Your <span className="text"> Corporate Affairs Certificate</span> Validation failed</h4>
            <h4 className="text-me">No worries you can upload again</h4>
            <form onSubmit={(e)=>{submitHandler(e)}}>
            <label>certificate</label>
            <input type="file" className="cac" name="caCertificate" value={info.caCertificate} onChange={(e)=>{changeHandler(e)}} required/>
            <label>certicate number</label>
            <input type="text" className="" name="cacNo" placeholder="Number" value={info.cacNo} onChange={(e)=>{changeHandler(e)}}  required/>
            <button type="submit" className="view-btn btn">
              submit
            </button> 
            </form>
          </div> 
         </div>
       </div>
    </div>
    )
  }
  return (
      <div className="dashContainer">
      <div className="">
          <Sidebar />
      </div>
      <div className="dashContainer-box">
          <div className="dashContainer-nav">
            <div className="dashContainer-nav-content">
            {profilePic? <img src={profile} className="avatar"/>:<div><CgProfile /></div>}
            <p>{user.firstname}</p>
            {account?<p>{account}</p>:<p>0.00</p>}
            </div>
          </div>
          <div className="margin"></div>
         <div className={ `${showLinks?"hid":"kyc"}`}>
          <div>
            <h4 className="text-me">Upload Your <span className="text"> Corporate Affairs Certificate</span> for Account Validation</h4>
            <form onSubmit={(e)=>{submitHandler(e)}}>
            <label>certificate</label>
            <input type="file" className="cac" name="caCertificate" value={info.caCertificate} onChange={(e)=>{changeHandler(e)}} required/>
            <label>certicate number</label>
            <input type="text" name="cacNo" className="" placeholder="Number" value={info.cacNo} onChange={(e)=>{changeHandler(e)}}  required/>
            <button type="submit" className="view-btn btn">
              submit
            </button> 
            </form>
          </div>
         </div>
       </div>
      </div>
  )
}

export default Kyc
