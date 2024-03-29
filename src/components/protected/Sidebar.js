import React, {useState,useRef} from 'react'
import {links} from './sideData'
import logo from '../assets/images/verifier_logo.png'
import { FaBars } from 'react-icons/fa';
import {useGlobalContext} from '../context/context'
import { useHistory } from "react-router-dom";

function Sidebar() {
  let history = useHistory();
  const {setRemove,showLinks,setShowLinks} = useGlobalContext()
 
  const toggleLinks = () => {
    setShowLinks(!showLinks);
    if(!showLinks){
      setRemove("hid")
    }else{
      setRemove("")
    }
    
  };
  const logOut = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toggleLinks()
    history.push("/login");
  }
  return (
    <div className="sideBar">
      <div className="logo-2">
        <img className="logo-img" src={logo} alt="vantsms logo" />
        <button className='nav-toggle' onClick={()=>{toggleLinks()}}>
            <FaBars />
        </button>
      </div>
      <div className={`${showLinks?`${"navigi navig"}`:"navig hid"}`}>
      {
        links.map((link)=>{
          const {id,url,text,icon} = link;
          return <li key={id}>
            <a href={url} className="navig-link">
              <div className="side-text">{icon}</div>
              <div  className="side-text">{text}</div>
              
            </a>
          </li>
        })
      }
      <div className="logout">
        <form>
          <button type="button" className="view-btn btn btn-danger" onClick={logOut}>Logout</button>
        </form>  
      </div>
      </div>
    </div>
  )
}

export default Sidebar
