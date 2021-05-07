import React, { useState, useContext } from 'react';
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
  const setTheToken = () =>{
    setToken(helpers.getToken());
    if(helpers.getToken() == null){
      history.push("/login")
    }
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
    setKycStatus
  }}
  >{children} </AppContext.Provider>
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}