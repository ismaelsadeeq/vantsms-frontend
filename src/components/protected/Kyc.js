import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import { CgProfile } from 'react-icons/cg';
import { useHistory } from "react-router-dom";
import { FiCornerDownRight } from 'react-icons/fi';
import axios from 'axios';
import {url} from '../url';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/kyc.css';
const helpers = require('./helpers');


function Kyc() {
  let history = useHistory();
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
  const [profilePic,setProfilePic] = useState(false);
  const [kycDetails,setKycDetails] = useState("");
  const [number, setNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(undefined);

  const setTheToken = () =>{
    setToken(helpers.getToken());
    if(helpers.getToken() == null){
      history.push("/login")
    }
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
    const formData = new FormData();
    console.log(number)
    formData.append("cacNo", number);
    formData.append("cacCertificate", selectedFile); // If I set this state with e.target.file[0] it displays blank screen 
    console.log(formData)
    axios({
      method: 'POST',
      url: `${url}/kyc`,
      data: formData,
      headers:{
        "Content-type":"multipart/form-data",
        "Authorization":`Bearer ${token}`,
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
  const changeHandler = (e)=>{ //this is the change handler
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = (e) =>{ // I try posting only the image on change
      const formData = {caCertificate:e.target.result}
      console.log(token)
      axios({
        method: 'POST',
        url: `${url}/kyc`,
        data: formData,
        headers:{
          "Authorization":`Bearer ${token}`,
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
            <input type="file" className="cac" name="caCertificate"  onChange={(e)=>{changeHandler(e)}} required/>
            <label>certicate number</label>
            <input type="text" className="" name="cacNo" placeholder="Number" value={number} onChange={(e)=>{setNumber(e.target.value)}}  required/>
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
  return ( // This is the Method that loads default because no Kyc is uploaded
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
            <input type="file" className="cac" name="caCertificate"  onChange={(e) => changeHandler(e) }/>
            <label>certicate number</label>
            <input type="text" placeholder="Number" name="cacNo"  value={number} onChange={(e) => setNumber(e.target.value)} required />
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
