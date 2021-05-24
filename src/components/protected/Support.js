import React, {useState,useEffect} from 'react'
import Sidebar from './Sidebar'
import { useHistory } from "react-router-dom";
import TransactionModal from "./TransactionModal"
import { CgProfile } from 'react-icons/cg';
import {useGlobalContext} from '../context/context'
import profile from '../assets/images/me.jpg'
import axios from "axios"
import {url} from "../url"
import '../../Stylesheet/kyc.css'
import AdminSupport from '../adminComponent/AdminSupport'
const helpers = require('./helpers');


function Support() {

  let history = useHistory();
  const {
    showLinks,
    isModalOpen,
    openModal,
    account,
    user,
    token,
    setToken,
    setTheUser,
    setAccountBalance
  } = useGlobalContext()
  const [profilePic,setProfilePic] = useState(false)
  const [support,setSupport] = useState("");
  const [adminStatus,setAdminStatus] = useState("");
  const [count, setCount]= useState(0);
  const [messages,setMessages] = useState([]);
  const [all, setAll] = useState(true)
  const [limit,setLimit] = useState(null)
  const [props,setProps] = useState(null);
  const [isback, setIsback] = useState(false);
  const setTheToken = () =>{
    setToken(helpers.getToken());
    if(helpers.getToken() == null){
      history.push("/login")
    }
  }
  const kyc =()=>{
    let youAdmin;
    axios({
      method: 'GET',
      url: `${url}/admin/isAdmin`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }).then(response => {
      console.log(response.data);
      if(response.data.status === true){
        setAdminStatus("admin");
        return youAdmin = "yes"
      }
      return setAdminStatus("user");
      
    })
    .catch(error=>{
      console.log(error); 
    })
    axios({
      method: 'GET',
      url: `${url}/admin/${all?"support":"unreplied-support"}?currentPage=${count}&pageLimit=5`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }).then(response => {
      console.log(response.data);
      if(youAdmin==="yes" && response.data.supports.length <1 && !isback){
        return setAdminStatus("admin no message");
      }
      setLimit(response.data.count)
      return setMessages(response.data.supports)
      
    })
    .catch(error=>{
      console.log(error); 
    })
  }
  const submitHandler = (e)=>{
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${url}/support`,
      data: {"support":support},
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data)
      if(response.data.status === true){
        alert("message send we'll get back to you shortly")
        setSupport("")
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const filter = ()=>{
    setAll(!all);
    kyc()
  }
  const open = (id,userId,support) =>{
    let data = {
      "id":id,
      "userId":userId,
      "message":support
    }
    setProps(data);
    return openModal();
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
  const back = () =>{
    setIsback(true);
    subtractCount();
    return kyc();
  }
  const next = () =>{
    console.log("limit",limit/5)
    let high = Math.floor(limit/5)
    if(count > high){
      return alert("no more users to message")
    }
    setCount(count +1);
    return kyc()
  }
  useEffect(() => {
    kyc()
    setAccountBalance();
    setTheUser();
    setTheToken();
    console.log(user.firstname)
    console.log(account)
    filter()
  }, [token])

  if(adminStatus ==="user"){
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
              <h4 className="text-me">Do you have something in mind you think we should know</h4>
              <p>feel free to reach out</p>
              <form onSubmit={(e)=>{submitHandler(e)}}>
                <textarea type="text" name="support" rows="8" value={support} onChange={(e)=>{setSupport(e.target.value)}}  placeholder="Whats on your mind" required ></textarea>
                <button type="submit" className="view-btn btn send">
                  Send Message
                </button>
              </form>
              <button className="view-btn reply btn"  onClick={openModal}>
                Show support replies
              </button>
          </div>
        </div>
        {isModalOpen? <TransactionModal  />:null}
      </div>
    )
  }

  if(adminStatus ==="admin"){
    return (
      <div className="dashContainer">
      <div className="">
          <Sidebar />
      </div>
      <div className="height">
          <div className="dashContainer-nav">
            <div className="dashContainer-nav-content">
            {profilePic? <img src={profile} className="avatar"/>:<div><CgProfile /></div>}
            <p>{user.firstname}</p>
            {account?<p>{account}</p>:<p>0.00</p>}
            </div>
          </div>
          <div className="margin"></div>
          <div className={ `${showLinks?"hid":"kyc"}`}>
            <div className="filter-btn">
            <button className="user-btn margin-btn" onClick={filter}>
              {
                all?"Get all messages":"Get unreplied messsages"
              }
            </button>
            </div>
            {
              messages.map((data)=>{
               const {id, support,supportReply,userId} = data;
               return  <div className="user column" key={id}>
                <div className="fifty">
                 <span className=""><span className="kyc-color">Message: </span >{support}</span>
               </div>
               <div>
               <div className="status">status: {
                 supportReply?<span className="kyc-color">replied</span>:<span className="kyc-color">not replied</span>
              }
              </div>
               </div>
               <div >
                 <button className="user-btn" onClick={()=>{open(id,userId,support)}}>
                 expand
                 </button>
               </div>
               
              </div>
            })
            }
            <div className="transaction-btn">
              <button className="view-btn btn btn-danger" onClick={back}>
                Back
              </button>
              <button className="view-btn btn" onClick={next}>
                Next
              </button>
            </div>
          </div>
        </div>
        {isModalOpen?<AdminSupport props={props}/>:null}
      </div>
    )
  }
  if(adminStatus ==="admin no message"){
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
          <div className={ `${showLinks?"hid":"kyc white"}`}>
            <h2 className="text-center">No support messages yet</h2>
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
        
    </div>
    </div>
  )
}

export default Support
