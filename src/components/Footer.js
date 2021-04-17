import React from 'react'
import '../Stylesheet/footer.css'
import pic from './assets/images/verifier_logo_alt.png'
function Footer() {
  return (
    <footer className="footer">
      <div className='container5'>
        <div className="flex">
          <img alt='phone number verification api' className='footer-logo' src={pic} />
            <small className="d-block mb-3 text-muted">© 2021 <br ></br>
            VantSMS provides reliable and affordable phone number verification and transaction SMS notification service </small>
        </div>
      <div className="link"> 
        <div className="grouped">
          <h5 className="bg-dark">Features</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/">Affordable pricing</a></li>
            <li><a className="text-muted" href="/">Reliable Service</a></li>
            <li><a className="text-muted" href="/">Fast Integration</a></li>
            <li><a className="text-muted" href="/">Easy Customization</a></li>
          </ul>
        </div>
        <div className="grouped">
          <h5 className="bg-dark">Resources</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/">Resource</a></li>
            <li><a className="text-muted" href="/">API Documentation </a></li>
          </ul>
        </div>
        <div className="grouped">
          <h5 className="bg-dark">About</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/">Privacy</a></li>
            <li><a className="text-muted" href="/">Terms</a></li>
          </ul>
        </div>
      </div>
      </div>
    </footer>
  )
}

export default Footer
