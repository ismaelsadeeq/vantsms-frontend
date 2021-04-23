import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Processing from './Processing'
import Navbar from '../components/Navbar'
import VerifyError from '../components/VerifyError'
import '../Stylesheet/forget.css'


function Code() {
  let history = useHistory();
  const data = {
    code:''
  }
  const getLocalStorage = () =>{
    let user = localStorage.getItem('user')
    if(user){
      return JSON.parse(localStorage.getItem('user'))
    } else{
      return []
    }
  }
  const [store,setStore] = useState(getLocalStorage())
  const [info, setInfo] = useState(data);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  function changeHandler (e){
    const property = e.target.name;
    const value = e.target.value;
    setInfo(ev => ({
      ...ev,
      [property] : value,
    }))  
  }
  function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    console.log(info);
    axios({
      method: 'post',
      url: 'http://localhost:8081/api/v1/auth/reset-password',
      data: info
    }).then(response=>{
      console.log(response.data);
      if(response.data === 'password changed'){
        history.push('/login')
      }
      if(response.data === 'password did not match'){
        setMessage('Password and confirm password do not match')
        setLoading(false)
        setError(true)
      }
      if(response.data === 'incorrect pin'){
        setMessage('Incorrect Code')
        setLoading(false)
        setError(true)
      }
    })
    .catch(error=>{
      setLoading(false);
      console.log(error);
    })
  }
  return (
    <>
    <Navbar />
      <section className="container">
   
      <section className="container-formm">

      <div className="form-headingg">
        <h3>Reset your password</h3>
      </div>
    

      <form onSubmit={(e)=>{submitHandler(e)}} className="form-containerr">
      {
        error ? <VerifyError message={message} />:<div></div>
      }
        <div className="field">
          <label className="labell">Enter the code sent to your Mail</label>
          <input className="inputt" type="text" placeholder="- - - - -" value={info.code} onChange={(e)=>{changeHandler(e)}} required />
          <label className="labell">Enter new Password</label>
          <input className="inputt" type="text" placeholder="Password" value={info.password} onChange={(e)=>{changeHandler(e)}} required />
          <label className="labell">Confirm new Password</label>
          <input className="inputt" type="text" placeholder="Confirm Password" value={info.confirmPassword} onChange={(e)=>{changeHandler(e)}} required />
        </div>
        <button className="buttonn btn-success">Submit</button> 
      </form>
    </section>
    {
      loading ? <Processing /> :<span></span>
    }
  </section>
  </>
  )
}

export default Code
