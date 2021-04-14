import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import '../Stylesheet/home.css'
import phoneImage from './assets/images/verified2.svg'

function Home() {
  return (
   <div>
       <Navbar />
     <div className='home'>
       <div className='container' id='home'>
          <div className='header'>
            <h1 className="banner-text">Affordable <span className='text'> <br  />Phone Number<br /></span> Verification Service!</h1>
            <p className='lead'>Reduce fraudulent accounts and speed up user onboarding. Easily verify users at signup by confirming phone number ownership </p>
            <a class='btn btn-dark btn-lg' href='/register'>Get Started</a>
          </div>
          <div className='header'>
          <img alt='Affordable Phone Verification Service' className='img-fluid' src={phoneImage}/>
          </div>
       </div>
     </div>

    {/* <Footer /> */}
   </div>
  )
}

export default Home
