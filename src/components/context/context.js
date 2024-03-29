import React, { useState, useContext } from 'react';
import axios from 'axios';
import {url} from '../url';
import { userExample } from '../protected/sideData';
import { userData } from '../protected/sideData';
const helpers = require("../protected/helpers");
const AppContext = React.createContext();

export const AppProvider = ({children}) =>{

  const [remove, setRemove] = useState("");
  const [showLinks,setShowLinks] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [token,setToken] = useState("");
  const [user,setUser] = useState(userData);
  const [account,setAccount] = useState("");
  const [transactions,setTransactions] = useState([]);
  const [kycStatus,setKycStatus] = useState(false)
  const [kycDetails,setKycDetails] = useState("");
  const [admin,setAdmin] = useState(false)
  const [isUserOpen,setIsUserOpen] = useState(false)
  const [getUser,setGetUser] = useState(userExample);
  
  function openUser(){
    setIsUserOpen(true)
  }
  function closeUser(){
    setIsUserOpen(false)
  }
  function openModal(){
    setIsModalOpen(true)
  }
  function closeModal(){
    setIsModalOpen(false)
  }
  const setTheUser = () =>{
    setUser(helpers.getUser());
    console.log(user);
  }
  const setAccountBalance = ()=>{
    axios({
      method: 'GET',
      url: `${url}/account`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }).then(response => {
      if(response.data){
        let smsBalance = response.data.smsBalance
        console.log(smsBalance)
        return setAccount(smsBalance)
      }
    })
    .catch(error=>{
      console.log(error); 
    })
  }
  const setTheKycStatus = ()=>{
    axios({
      method: 'GET',
      url: `${url}/kyc`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }).then(response => {
      console.log(response.data);
      if(response.data.data === null){
        return setKycStatus(false);
      }
      if(response.data.data === !null){
        return setKycStatus(true);
      }
    })
    .catch(error=>{
      console.log(error); 
    })
  }
  const getReplies = ()=>{
    axios({
      method: 'GET',
      url: `${url}/support?currentPage=0&pageLimit=5`,
      headers:{
        Authorization:`Bearer ${token}`,
      }
     
    }).then(response=>{
      console.log(response.data)
      // if(response.data.status === true){
      //   alert("message send we'll get back to you shortly")
      // }
    })
    .catch(error=>{
      console.log(error);
    })
  }
  return <AppContext.Provider
  value={{
    remove,
    setRemove,
    showLinks,
    setShowLinks,
    isModalOpen,
    openModal,
    closeModal,
    token,
    setToken,
    user,
    setUser,
    account,
    setAccount,
    transactions,
    setTransactions,
    kycStatus,
    setTheUser,
    setKycStatus,
    setAccountBalance,
    setTheKycStatus,
    getReplies,
    kycDetails,
    setKycDetails,
    admin,
    setAdmin,
    isUserOpen,
    openUser,
    setIsUserOpen,
    closeUser,
    setGetUser,
    getUser
  }}
  >{children} </AppContext.Provider>
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}