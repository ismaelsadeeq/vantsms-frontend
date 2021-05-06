import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({children}) =>{
  let userData = 
  {"id":"",
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
  let accountData = {
    "balance":""
  }
  const [remove, setRemove] = useState("");
  const [showLinks,setShowLinks] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [token,setToken] = useState("");
  const [user,setUser] = useState(userData);
  const [account,setAccount] = useState(accountData);
  const [transactions,setTransactions] = useState([]);
  const [kycStatus,setKycStatus] = useState(false)

  function openModal(){
    setIsModalOpen(true)
  }
  function closeModal(){
    setIsModalOpen(false)
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
    setTransactions
  }}
  >{children} </AppContext.Provider>
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}