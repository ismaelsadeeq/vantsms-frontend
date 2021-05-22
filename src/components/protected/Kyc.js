import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import User from './User';
import { CgProfile } from 'react-icons/cg';
import { useHistory } from "react-router-dom";
import { FiCornerDownRight } from 'react-icons/fi';
import axios from 'axios';
import {url} from '../url';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import '../../Stylesheet/kyc.css';
import { FaBalanceScaleLeft } from 'react-icons/fa';
import { userExample } from './sideData';

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
    kycDetails,
    setKycDetails,
  
    openUser,
    isUserOpen,
    setIsUserOpen,
    setGetUser
  } = useGlobalContext()
  const [profilePic,setProfilePic] = useState(false);
  const [number, setNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [count,setCount] = useState(0);
  const [id,setId] = useState("");
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [kycData,setKycData]= useState(null);
  const [kycStatus, setKycStatus] = useState(null)
  const [certlength, setCertlength] = useState(null);
  const [search,setSearch] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchData, setSearchData] = useState(null)

  const setTheToken = () =>{
    setToken(helpers.getToken());
    if(helpers.getToken() == null){
      history.push("/login")
    }
  }
  const kyc =()=>{
    let youAdmin ;
    axios({
      method: 'GET',
      url: `${url}/admin/isAdmin`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }).then(response => {
      console.log(response.data);
      if(response.data.status === true){
        setKycDetails("admin");
        youAdmin = "yes"
      }
    })
    .catch(error=>{
      console.log(error); 
    })
    axios({
      method: 'GET',
      url: `${url}/kyc`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }).then(response => {
      console.log(response.data);
      if(response.data.data === null && youAdmin !== "yes"){
        console.log(youAdmin)
        return setKycDetails("default");
      }
      if(response.data.data.isVerified ==null){
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
  const getUsers = ()=>{
    axios({
      method: 'GET',
      url: `${url}/admin/users?currentPage=${count}&pageLimit=5`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data)
      if(response.data.length>= 1){
        setUsers(response.data);
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const addCount = () => {
    let newCount = count + 1
    setCount(newCount);
  }
  const subtractCount = () => {
    console.log(count);
    if(count > 0){
      console.log(count);
      return setCount(count -1)
    }else{
      alert("this is the first page")
    } 
  }
  const back = (e) =>{
    e.preventDefault()
    subtractCount();
    return getUsers();
  }
  const next = (e) =>{
    e.preventDefault()
    setCount(count +1);
    return getUsers();
  }
  const openUserModal = (id)=>{
    setId(id);
    openUser()
    axios({
      method: 'GET',
      url: `${url}/admin/users/${id}`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data);
      if(response.data){
        setUserData(response.data)
        console.log("user data",userData)
      }
    })
    .catch(error=>{
      console.log(error);
    })
    axios({
      method: 'GET',
      url: `${url}/kyc/${id}`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data);
      if(response.data.data){
        setKycStatus(true);  
        setKycData(response.data.data)
        setCertlength(parseInt(kycData.caCertificate.length))
        return console.log(certlength)
      }
      setKycStatus(false);
    })
    .catch(error=>{
      console.log(error);
    })

  }
  const searchChange= (e) =>{
    e.preventDefault();
    return setSearchEmail(e.target.value);
  }
  const searchHandler = ()=>{
     setSearch(true);
     console.log(searchEmail);
     axios({
      method: 'GET',
      url: `${url}/admin/search?search=${searchEmail}`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data);
      if(response.data.message ==="user found"){
         setSearchData(response.data.data)
         console.log(searchData);
      }
      if(response.data.message ==="user not found"){
        return setSearchData(null);
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
  useEffect(() => {
    setAccountBalance();
    kyc();
    setTheUser();
    setTheToken();
    getUsers();
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
          <a className="view-btn btn" href="/profile">
             <FiCornerDownRight />
          </a>
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
            <a className="view-btn btn" href="/profile">
             <FiCornerDownRight />
          </a>
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
  if(kycDetails =="admin"){
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
         <div className={ `${showLinks?"hid":"kyc users"}`}>
         <div className="">
           <div className="search">
               <div className="searchDiv">
               <input className="searchInput" placeholder="Search for a user" value={searchEmail} onChange={
                 (e)=>{
                   searchChange(e)
                 }
               } />
               <button className="searchButton view-btn btn btn-danger" onClick={searchHandler}>search</button>
               </div>
           </div>
           {
             search?<div>
               {
                 searchData?<div className="user " key={searchData.id}>
                 <div className="center">
                  <span className="user-avatar"><CgProfile/></span>
                  <span className="user-name">{searchData.firstname + " "+ searchData.lastname}</span>
                </div>
                <div>
                <span className="kycStatus">kyc status:{
                  searchData.kycStatus?<span className="kyc-color"> verified</span>:<span className="kyc-color"> not verified</span>
               }
               </span>
                </div>
                <div >
                  <button className="user-btn" onClick={()=>{openUserModal(searchData.id)}}>
                  user info
                  </button>
                </div>
                <div>
                <button className="view-btn btn btn-danger" onClick={()=>{
                  setSearch(false)
                  setSearchEmail("");
                }
                  }>back</button>
                </div>
              </div>:<div>
                      <p>oops there is no user with such email</p>
                      <button className="view-btn btn btn-danger" onClick={()=>{setSearch(false)}}>back</button>
                 </div>
               }

             </div>:<div>
               {
             users.map((data)=>{
               const {id, firstname, lastname,kycStatus} = data;
               return  <div className="user " key={id}>
                <div className="center">
                 <span className="user-avatar"><CgProfile/></span>
                 <span className="user-name">{firstname + " "+ lastname}</span>
               </div>
               <div>
               <span className="kycStatus">kyc status:{
                 kycStatus?<span className="kyc-color"> verified</span>:<span className="kyc-color"> not verified</span>
              }
              </span>
               </div>
               <div >
                 <button className="user-btn" onClick={()=>{openUserModal(id)}}>
                 user info
                 </button>
               </div>
             </div>
             })
           }
             </div>
           }
           
            <div className={search?"hidden":"transaction-btn"}>
            <form onSubmit={(e)=>{back(e)}}>
              <button className="view-btn btn btn-danger" type="submit">
                back
              </button>
            </form>
            <form onSubmit={(e)=>{next(e)}}>
              <button className="view-btn btn btn-danger" type="submit">
                next
              </button>
            </form>
            </div>
          </div> 
         </div>
       </div>
       {isUserOpen?<User user={userData} kyc={kycData} status={kycStatus} certlength={certlength} />:null}
    </div>
    )
  }
  if(kycDetails =="default"){
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
  return ( // This is the Method that loads default because no Kyc is uploaded
      <div></div>
  )
}

export default Kyc
