import React from 'react'
import '../../Stylesheet/dashboard.css'

function Dashboard() {
  return (
    <section class="contain">
    <div class="contain emp-profile">
        <form method="post">
            <div class="row">
                <div class="col-md-4">
                    <div class="profile-img">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                        <div class="file btn btn-lg btn-primary">
                            Change Photo
                            <input type="file" name="file"/>
                        </div>
                        <div class="col-md-2">
                            <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="profile-head">
                                <h5>
                                    {/* {{user?.firstname}} {{user?.lastname}} */}
                                </h5>
                                <h6>
                                    {/* {{user?.email}} */}
                                </h6>
                                <p class="proile-rating">SMS Balance : <span class="mr-4">1000</span> <a class="btn btn-small btn-success btn-outline"> Top Up Now</a> </p>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link"  role="tab" aria-controls="profile" aria-selected="false">API Keys & settings</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-2">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">

                </div>
                <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Account Type</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p >Company/organization</p>
                                            <p>Individual</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Verification</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Verified</p>
                                            <p> <span class="text-danger">Unverified </span> <br /> Verify Now</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div class="col-md-6">
                                            {/* <p>{{user?.email}}</p> */}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div class="col-md-6">
                                            {/* <p>{{user?.phonenumber}}</p> */}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Web Developer and Designer</p>
                                        </div>
                                    </div>
                        </div>
                        <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="profile-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>API KEy</label>
                                        </div>
                                        <div class="col-md-6">
                                            {/* <p>{{user?.apiKey}}</p> */}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Secret Key </label>
                                        </div>
                                        <div class="col-md-6">
                                            {/* <p>{{user?.apiSecret}}</p> */}
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>           
    </div>
</section>
  )
}

export default Dashboard
