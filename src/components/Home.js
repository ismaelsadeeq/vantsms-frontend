import React from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"
import "../Stylesheet/home.css"
import "react-icons"
import { FaGlobeAsia } from "react-icons/fa"
// import { IoRocketSharp } from "react-icons"
import phoneImage from "./assets/images/verified2.svg"

function Home() {
  return (
   <div>
        <Navbar />
      <div className="home">
        <div className="container" id="home">
            <div className="header">
              <h1 className="banner-text">Affordable <span className="text"> <br  />Phone Number<br /></span> Verification Service!</h1>
              <p className="lead">Reduce fraudulent accounts and speed up user onboarding. Easily verify users at signup by confirming phone number ownership </p>
              <a class="btn btn-dark btn-lg" href="/register">Get Started</a>
            </div>
            <div className="header">
            <img alt="Affordable Phone Verification Service" className="img-fluid img-fluidd" src={phoneImage}/>
            </div>
        </div>
        <div className="container wid">
            <div className="col-md-6 wow fadeInLeft banner-img" data-wow-delay=".5s">
                <img  alt="Affordable Phone Verification Service" className="img-fluid increace" src="assets/images/verified.svg" />
              </div>  
              <div >
                <h1 className="header2 banner-text decrease">
                  Reliable <span className="text">Transaction SMS </span>
                  Notification Service
                </h1>
                <p>Send the right message at the right time! <br></br>Deliver timely notifications, Automated notifications reduce costs, missed appointments, delivery attempts, and more</p>
                <a className="btn btn-success" href="/register">Get Started</a>
              </div>
        </div>
        <section>
        <div className="container2" id="features">
          <div className="">
                <div className="banner-text">
                    <h2 className="text-center"><span className="text">About Us </span> What makes us better?</h2>
                    <p className="text-center lead">Here are the principal reasons to choose us over others.</p>
                <div className="spacer-20"></div>
              </div>
            </div>
           <div className="row2">
           <div class="">
          <div className="serviceBox">
            <div className="service-icon">
                <span><i ><FaGlobeAsia /></i></span>
            </div>
            <div className="service-content">
                <h3 className="title">Budget <span>Pricing</span></h3>
                <p className="description">From N15/SMS to as low as N10/SMS. Heavy consumer? send us an email to get our super volume discount. </p>
            </div>
            </div>
          </div>
              <div className="col-md-3 col-sm-6">
                  <div className="serviceBox darkgreen">
                    <div className="service-icon">
                      <span><i ><FaGlobeAsia /></i></span>
                    </div>
                    <div className="service-content">
                      <h3 className="title">Reliable <span>Service</span></h3>
                      <p className="description">Verify phone numbers accross all Nigerian telcos, experience 99.9% delivery rate with our robust service .</p>
                    </div>
                  </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="serviceBox blue">
                  <div className="service-icon">
                      <span><i className="fa fa-mobile"><FaGlobeAsia /></i></span>
                  </div>
                  <div className="service-content">
                    <h3 className="title">Fast <span>Integration</span></h3>
                      <p className="description"> Integrating Vantsms verification and transaction APIs is so easy it can be done in a single sprint.</p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="serviceBox darkblue">
                  <div className="service-icon">
                      <span><i className="fa fa-briefcase"><FaGlobeAsia /></i></span>
                  </div>
              <div className="service-content">
                  <h3 className="title"> <span>Customizable</span></h3>
                  <p className="description">Use our auto-generated OTP and verification feature or generate custom messages and verification flow.</p>
              </div>
              </div>
          </div>
          
          </div>
        </div>
        </section>
        <div  id="pricing" className="banner-text">
          <h1 className="text-center increasePad">Pricing</h1>
          <p className="lead text-center">VantSMS provides a very easy pricing model. Our volume pricing ensures you get<br className="break"></br> the best pricing available in the market.</p>
        </div>
        <div className="container3">
          <div className="body">
              <div className="p-head">
              <h4 className="text-center">Hobbyist</h4>
              </div>
              <div className="p-body">
              <h1 className="text-center">N15 <small className="text-mute">/ SMS</small></h1>
              <ul className="text-center">
                <li>N1K - N100K</li>
                <li>Flat Pricing for all networks</li>
                <li>Access to APIs</li>
                <li>Custom Sender ID</li>
              </ul>
              <a type="button" className="btn btn-lg btn-block btn-outline-primary" href='/register'>Sign up</a>
              </div>
          </div>
          <div className="body">
              <div className="p-head">
              <h4 className="text-center">Startups</h4>
              </div>
              <div className="p-body">
              < h1 className="text-center">N12.5   <small className="text-mute"> / SMS</small></h1>
              <ul className="text-center">
                <li>N101k - N999.99K</li>
                <li>Flat Pricing for all networks</li>
                <li>Access to APIs</li>
                <li>Custom Sender ID</li>
              </ul>
              <a type="button" className="btn btn-lg btn-block btn-primary" href='/register'>Get started</a>
             </div>
          </div>
          <div className="body">
              <div className="p-head">
              <h4 className="text-center">Enterprise</h4>
              </div>
              <div className="p-body">
                <h1 className="text-center">N10 <small className="text-mute">/ SMS</small></h1>
                <ul className="text-center">
                  <li>Above N1M</li>
                  <li>Flat Pricing to all networks</li>
                  <li>Access to APIs</li>
                  <li>Custom Sender ID</li>
                </ul>
                <a type="button" className="btn btn-lg btn-block btn-primary" href='/register'>Signup Now</a>
              </div>
          </div>
        </div>
        
        <Footer />
      </div>
   </div>
  )
}

export default Home
