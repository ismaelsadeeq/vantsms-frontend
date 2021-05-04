import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import  '../Stylesheet/verify.css'
import Navbar from '../components/Navbar'
import VerifyError from '../components/VerifyError'
import Processing from './Processing'
import {url} from './url'

function Verify() {
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
      url: `${url}/auth/verify-email`,
      data: info
    }).then(response=>{
      console.log(response.data.message);
      if(response.data.message === 'Account is already verified'){
        history.push('/dashboard')
      }
      if(response.data.message === 'Account Verified'){
        history.push('/dashboard')
      }
      if(response.data.message === 'Invalid Code entered'){
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
    <div>
      <Navbar />
    <section className="container">
      <section className="container-form">

        <div className="form-heading">
          <h6>Enter the 6 digit code sent to your Email</h6>
        </div>
        <form onSubmit={(e)=>{submitHandler(e)}} className="form-container">
          {
            error ? <VerifyError message='Incorrect code' />:<div></div>
          }
          <div className="field">
            <input className="Vinput" name="code" maxLength="6" type="text" placeholder="- - - - -" value={info.code} onChange={(e)=>{changeHandler(e)}} required />
          </div>        
          <button className="button btn-success" >Verify</button>
        </form>
      </section>
    </section>
    {
        loading ? <Processing /> :<span></span>
      }
</div>
  )
}

export default Verify
