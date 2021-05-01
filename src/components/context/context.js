import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({children}) =>{
  const [remove, setRemove] = useState("")

  return <AppContext.Provider
  value={{remove,setRemove}}
  >{children} </AppContext.Provider>
}

export const useGlobalContext = ()=>{
  return useContext(AppContext);
}