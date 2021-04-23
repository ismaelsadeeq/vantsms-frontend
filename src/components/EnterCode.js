import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Processing from './Processing'
import Navbar from '../components/Navbar'
import VerifyError from '../components/VerifyError'
import '../Stylesheet/forget.css'


function EnterCode() {
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
        history.push('/forget-password')
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
          <input className="inputt" type="email" placeholder="Email" onChange={(e)=>{changeHandler(e)}} required />
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

export default EnterCode
