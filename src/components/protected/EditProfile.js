import React,{useState,useEffect} from 'react'
import { FaTimes } from 'react-icons/fa'
import { useHistory } from "react-router-dom";
import axios from "axios"
import {url} from "../url" 
import { useGlobalContext } from '../context/context'
const EditProfile = () => {

  let history = useHistory();
  const profileData = {
    phonenumber:"",
    firstname:"",
    lastname:"",
    password:"",
  }
  const changePasswordData = {
    password:"",
    newPassword:"",
    confirmPassword:""
  }
  const {isModalOpen,closeModal,token} = useGlobalContext();
  const [state,setState] = useState(true)
  const [profile,setProfile] = useState(profileData)
  const [changePassword,setChangePassword] = useState(changePasswordData)
  const toggleState = () =>{
    setState(!state)
  }
  function changeHandler (e){
    const property = e.target.name;
    const value = e.target.value;
    setProfile(ev => ({
      ...ev,
      [property] : value,
    }))  
  }
  function changeHandlerTwo (e){
    const property = e.target.name;
    const value = e.target.value;
    setChangePassword(ev => ({
      ...ev,
      [property] : value,
    }))  
  }
  const editProfileSubmitHandler = (e) =>{
    e.preventDefault();
    axios({
      method: 'PUT',
      url: `${url}/users/profile`,
      data: profile,
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }).then(response=>{
      console.log(response.data)
      if(response.data.status === true){
        alert("user updated")
        closeModal()
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
  const changePasswordSubmitHandler = (e) =>{
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${url}/auth/change-password`,
      data: changePassword,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data)
      if(response.data.status === 'success'){
        alert("password updated")
        closeModal()
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
  return <div className={`${isModalOpen?'modal-overlay show-modal':'modal-overlay'}`}>
    <div className='modal-container'>
      <div className="modal-btn">
        <button className={`${state?"form-button":"border"}`} onClick={()=>{toggleState()}}>Edit Profile</button>
        <button className={`${state?"border":"form-button"}`} onClick={()=>{toggleState()}}>Change password</button> 
      </div>
      <button className='close-modal-btn' onClick={closeModal}>
        <FaTimes />
      </button>
      {
        state?<div>
        <form onSubmit={(e)=>{
          editProfileSubmitHandler(e)
        }}>
          <label>Phone number</label>
          <input type="text" name="phonenumber" value={profile.phonenumber} placeholder="Phone number"  onChange={(e)=>{changeHandler(e)}} required/>
          <label>firstname</label>
          <input type="text" name="firstname" value={profile.firstname} placeholder="Firstname"  onChange={(e)=>{changeHandler(e)}} required/>
          <label>lastname</label>
          <input type="text" name="lastname" value={profile.lastname} placeholder="Lastname"  onChange={(e)=>{changeHandler(e)}} required/>
          <button type="submit" className='submit-modal-btn'>
            submit
          </button>
        </form>
      </div>:<div>
        <form  onSubmit={(e)=>{
          changePasswordSubmitHandler(e)
        }}>
          <label>Current Password</label>
          <input type="password" name="password" value={changePassword.password} placeholder="Current Password"  onChange={(e)=>{changeHandlerTwo(e)}} required/>
          <label>New password</label>
          <input type="password" name="newPassword" value={changePassword.newPassword} placeholder="New Password"  onChange={(e)=>{changeHandlerTwo(e)}} required/>
          <label>Confirm password</label>
          <input type="password" name="confirmPassword" value={changePassword.confirmPassword} placeholder="Confirm New Password"  onChange={(e)=>{changeHandlerTwo(e)}} required/>
          <button type="submit" className='submit-modal-btn'>
            submit
          </button>
        </form>
      </div>
      }
      
    </div>
  </div>
}

export default EditProfile
