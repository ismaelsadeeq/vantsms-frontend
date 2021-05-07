const getToken = () =>{
  let list = localStorage.getItem('token')
  if(list){
    return JSON.parse(localStorage.getItem('token'))
  } else{
    return null
  }
}
const getUser = () =>{
  let list = localStorage.getItem('user')
  if(list){
    return JSON.parse(localStorage.getItem('user'))
  } else{
    return []
  }
}

module.exports = {
  getToken,
  getUser
}