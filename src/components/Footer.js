import React from 'react'
import '../Stylesheet/footer.css'
function Footer() {
  return (
    <footer className="">
      <div className="">
        <div className="">
          <div className="">
            <img src='../public/assets/images/verifier_logo_alt.png' alt='phone number verification api' className='footer-logo' />
            <small className="d-block mb-3 text-muted">© 2021
            VantSMS provides reliable and affordable phone number verification and transaction SMS notification service</small>
          </div>
          <div className="">
            <h5>Features</h5>
            <ul className="">
              <li><a className="text-muted" href="#">Affordable pricing</a></li>
              <li><a className="text-muted" href="#">Reliable Service</a></li>
              <li><a className="text-muted" href="#">Fast Integration</a></li>
              <li><a className="text-muted" href="#">Easy Customization</a></li>
            </ul>
          </div>
          <div className="d">
            <h5>Resources</h5>
            <ul className="">
              <li><a className="text-muted" href="#">Resource</a></li>
              <li><a className="text-muted" href="#">API Documentation </a></li>
            </ul>
          </div>
          <div className="">
            <h5>About</h5>
            <ul className="">
              <li><a className="text-muted" href="#">Privacy</a></li>
              <li><a className="text-muted" href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>  
    </footer>
  )
}

export default Footer
