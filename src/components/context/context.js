import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({children}) =>{
  const [remove, setRemove] = useState("");
  const [showLinks,setShowLinks] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal(){
    setIsModalOpen(true)
  }
  function closeModal(){
    setIsModalOpen(false)
  }
  return <AppContext.Provider
  value={{remove,setRemove,showLinks,setShowLinks,isModalOpen,openModal,closeModal}}
  >{children} </AppContext.Provider>
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}