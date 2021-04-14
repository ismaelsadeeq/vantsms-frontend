import React from 'react'
import {Switch , Route,Redirect} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ResetPassword from './ResetPassword'
import Verify from './Verify'
import ForgetPassword from './ForgetPassword'
import Admin from './adminComponent/Admin'
import AdminKyc from './adminComponent/AdminKyc'
import AdminSupport from './adminComponent/AdminSupport'
import AdminUsers from './adminComponent/AdminUsers'
import ChangePassword from './protected/ChangePassword'
import Contact from './protected/Contact'
import Dashboard from './protected/Dashboard'
import Kyc from './protected/Kyc'
import Profile from './protected/Profile'
import Setting from './protected/Setting'
import Transaction from './protected/Transaction'
import Support from './protected/Support'

function Main() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/api" exact component={Home} />
        <Route path="/features" exact component={Home} />
        <Route path="/pricing" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin-users" component={AdminUsers} />
        <Route exact path="/admin-support" component={AdminSupport} />
        <Route exact path="/admin-kyc" component={AdminKyc} />
        <Route exact path="/setting" component={Setting} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/kyc" component={Kyc} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/transaction" component={Transaction} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/change-password" component={ChangePassword} />
        <Redirect path="/" />
      </Switch>
    </div> 
  )
}

export default Main
