import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import Navbar from './Navbar'
import Processing from './Processing'
import VerifyError from '../components/VerifyError'
import axios from 'axios'
import {url} from './url'

function Login() {
  let history = useHistory();
  const data = {
    email:'',
    password:'',
  }
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
  function submitHandler (e) {
    e.preventDefault();
    setLoading(true);
    console.log(info);
    axios({
      method: 'post',
      url: `${url}/auth/login`,
      data: info
    }).then(response=>{
      console.log(response.data);
      if(response.data.status === 'success'){
        let token = response.data.token;
        let user = response.data.data;
        localStorage.setItem('token',JSON.stringify(token));
        localStorage.setItem('user',JSON.stringify(user));
        history.push('/dashboard')
      }
      if(response.data === 'No account found'){
        setMessage('No Account with this email')
        setLoading(false)
        setError(true)
      }
      if(response.data.message === 'Incorrect passsword'){
        setMessage('Incorrect Password')
        setLoading(false)
        setError(true)
      }
      
    })
    .catch(error=>{
      setLoading(false)
      console.log(error);
    })
  }

  return (
    <div>
      <Navbar />
      <section className="container">
        <section className="container-form">

          <div className="form-heading">
            <h1>Login</h1>
            <p>Log in your account to continue</p>
          </div>
        

          <form onSubmit={(e)=>{submitHandler(e)}} className="form-container">
            {
               error ? <VerifyError message={message} />:<div></div>
            }
            <div className="text-danger text-center info-danger" >
            </div>
            
            <div className="field">
              <label className="label">Email</label>
              <input className="input"  name="email" type="email" placeholder="Email" value={info.email} onChange={(e)=>{changeHandler(e)}} required></input>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <input className="input"  name="password" type="password" placeholder="Password" value={info.password} onChange={(e)=>{changeHandler(e)}} required></input>
            </div>        
            
            <button type="submit" className="button btn-success" >Log In</button>

            <div className="form-buttom">
              <p className="form-buttom-text">Not Registered? <span className="red"><a className="red " href='/register'>Create an account</a></span></p>
              <a className="red " href='/forget-password'>Forgot Password?</a>
            </div>
          </form>
        </section>
      </section>
      {
        loading ? <Processing /> :<span></span>
      }
    </div>
  )
}

export default Login
