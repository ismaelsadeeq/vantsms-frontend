import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import Navbar from './Navbar'
import Processing from './Processing'
import '../Stylesheet/register.css'
import axios from 'axios'

function Register() {
  let history = useHistory();
  const data = {
    firstname:'',
    lastname:'',
    email:'',
    phoneNumber:'',
    password:'',
    confirmPassword:''
  }
  const [info, setInfo] = useState(data);
  const [loading, setLoading] = useState(false);
  
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
      url: 'http://localhost:8081/api/v1/auth/register',
      data: info
    })
    .then(response=>{
      console.log(response.data);
      if(response.data === 'password didnt match'){
        history.push('/register')
      }
      if(response.data.status === false && response.data.message === 'you have an account sign in'){
        history.push('/login')
      }
      if(response.data.status === false && response.data.message === 'empty post'){
        setLoading(false)
      }
      if(response.data.status === false && response.data.message === 'Could not create account'){
        setLoading(false);
        history.push('/register')
      }
      if(response.data.status === true && response.data.message === 'Account created succesfully'){
        axios({
          method: 'post',
          url: 'http://localhost:8081/api/v1/auth/login',
          data: info
        }).then(response=>{
          console.log(response.data);
          let token = response.data.token
          let user = response.data.data
          localStorage.setItem('token',JSON.stringify(token));
          localStorage.setItem('user',JSON.stringify(user));
          history.push('/verify')
        })
        .catch(error=>{
          history.push('/login')
          console.log(error);
        })
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
      <section className="containerr">
        <section className="container-form">
          <div className="form-heading">
            <h1>Sign Up</h1>
            <p>Create your Account now</p>
          </div>
          <form onSubmit={(e)=>{submitHandler(e)}}  className="form-container">
            <div className="text-danger text-center info-danger"></div>
                <div className="field">
                  <label className="label">First Name</label>
                    <input className="input" type="text" placeholder="First Name" name="firstname" value={info.firstname} onChange={(e)=>{changeHandler(e)}} required ></input>
                </div>
                <div className="field">
                  <label className="label">Last Name</label>
                  <input className="input" type="text" placeholder="Last Name" name="lastname" value={info.lastname} onChange={(e)=>{changeHandler(e)}}  required />
                </div>
                  <div className="field">
                        <label className="label">Email</label>
                      <input className="input" type="email" placeholder="Email" name="email" value={info.email} onChange={(e)=>{changeHandler(e)}} required />
                  </div>
                  <div className="field">
                    <label className="label">Phone Number</label>
                    <input className="input" type="number" placeholder="Phone Number" name="phoneNumber" value={info.phoneNumber} onChange={(e)=>{changeHandler(e)}} required />
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                      <input className="input" type="password" placeholder="Password" name="password" value={info.password}  onChange={(e)=>{changeHandler(e)}} required />
                  </div>
                  <div className="field">
                    <label className="label">Confirm Password</label>
                    <input className="input" type="password" placeholder="Confirm Password" name="confirmPassword" value={info.confirmPassword} onChange={(e)=>{changeHandler(e)}} required />
                  </div>
                <button type="submit" className="button btn-success" >Register</button>
                <p className="form-buttom-text">Already have an account? <a href="/login"><span className="red">Log in here</span></a></p>
                <p className="form-buttom-text">By clicking this button, you are agreeing to our <span className="red">Terms and Conditions.</span></p>
                <input className="input" type="hidden" placeholder="Confirm Password" name="username"  />
          </form>
        </section>
      </section>
      {
        loading ? <Processing /> :<span></span>
      }
  </div>
  )
}

export default Register
