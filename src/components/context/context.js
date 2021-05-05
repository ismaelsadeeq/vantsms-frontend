import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({children}) =>{
  const [remove, setRemove] = useState("");
  const [showLinks,setShowLinks] = useState(false)

  return <AppContext.Provider
  value={{remove,setRemove,showLinks,setShowLinks}}
  >{children} </AppContext.Provider>
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}