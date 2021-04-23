import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Processing from './Processing'
import Navbar from '../components/Navbar'
import VerifyError from '../components/VerifyError'
import '../Stylesheet/forget.css'

function ForgetPassword() {
  let history = useHistory();
  const data = {
    email:''
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
      url: 'http://localhost:8081/api/v1/auth/verify-email',
      data: info
    }).then(response=>{
      console.log(response.data.message);
      if(response.data.message === 'An error occurred'){
        history.push('/forget-password');
      }
      if(response.data.message === 'code Sent'){
        history.push('/enter-code')
      }
      if(response.data.message === 'No account with this email'){
        setMessage('Sorry No Account with this email')
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
   
    <section className="container-formm">

      <div className="form-headingg">
        <h4>Recover your password</h4>
      </div>
    

      <form onSubmit={(e)=>{submitHandler(e)}} className="form-containerr">
      {
        error ? <VerifyError message={message} />:<div></div>
      }
      <div className="field">
          <label className="labell">Enter your email address</label>
          <input className="inputt" type="email" placeholder="Email" name="email" value={info.email} onChange={(e)=>{changeHandler(e)}} required />
        </div>
        <button className="buttonn btn-success">Submit</button>
        <div className="form-buttomm">
          <p className="form-buttom-text">Not Registered? <span><a className='reg' href="/register">Create an account</a></span></p>
          <a className="red text-center" href="/login">Log in here</a>
        </div>   
      </form>
    </section>
    {
      loading ? <Processing /> :<span></span>
    }
</section>
</div>
  )
}

export default ForgetPassword
