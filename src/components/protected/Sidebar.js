import React, {useState} from 'react'
import {links} from './sideData'
import logo from '../assets/images/verifier_logo.png'
import { FaBars } from 'react-icons/fa';

function Sidebar() {
  const [showLinks,setShowLinks] = useState(false)

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  return (
    <div className="sideBar">
      <div className="logo-2">
        <img className="logo-img" src={logo} alt="vantsms logo" />
        <button className='nav-toggle' onClick={()=>{toggleLinks()}}>
            <FaBars />
        </button>
      </div>
      <div className={showLinks?"navig":"hid"}>
      {
        links.map((link)=>{
          const {id,url,text,icon} = link;
          return <li key={id}>
            <a href={url}>
              {icon}
              {text}
            </a>
          </li>
        })
      }
      <div className="logout">
        <form>
          <button type="button" className="out">logout</button>
        </form>  
      </div>
      </div>
    </div>
  )
}

export default Sidebar
