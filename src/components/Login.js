import React from 'react'
import Navbar from './Navbar'
function Login() {
  return (
    <div>
      <Navbar />
      <section className="container">
  <section className="container-form">

    <div className="form-heading">
      <h1>Login</h1>
      <p>Log in your account to continue</p>
    </div>
   

    <form action="#" className="form-container">
      
      <div className="text-danger text-center info-danger" >
      </div>
      
      <div className="field">
        <label className="label">Email</label>
        <input className="input"  name="email" type="email" placeholder="Email" required></input>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <input className="input"  name="password" type="password" placeholder="Password" required></input>
      </div>        
      
      <a className="button btn-success" >Log In</a>

      <div className="form-buttom">
        <p className="form-buttom-text">Not Registered? <span className="red"><a >Create an account</a></span></p>
        <a className="red forget">Forgot Password?</a>
      </div>
      
    </form>
  </section>
</section>
<div className="loader">
  <h6 className="text-danger">
      Processing ...<br ></br>
      Please wait 
  </h6>
</div>
    </div>
  )
}

export default Login
