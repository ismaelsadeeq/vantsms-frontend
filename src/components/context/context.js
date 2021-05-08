import React, { useState, useContext } from 'react';
import axios from 'axios';
import {url} from '../url';
const helpers = require("../protected/helpers");
const AppContext = React.createContext();

export const AppProvider = ({children}) =>{
  let userData = 
  {
    "id":"",
    "email":"",
    "firstname":"",
    "lastname":"",
    "phoneNumber":"",
    "apiKey":"",
    "apiSecret":"",
    "accountNumber":"",
    "isCorporate":false,
    "isVerified":true,
  }
 
  const [remove, setRemove] = useState("");
  const [showLinks,setShowLinks] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [token,setToken] = useState("");
  const [user,setUser] = useState(userData);
  const [account,setAccount] = useState("");
  const [transactions,setTransactions] = useState([]);
  const [kycStatus,setKycStatus] = useState(false)

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
    setTheKycStatus
  }}
  >{children} </AppContext.Provider>
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}