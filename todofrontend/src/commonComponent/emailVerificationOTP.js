import React, { Component } from 'react'
import axios from "axios";

//ehwn user fill the registration form and clike on sign up the this component called form OTP
export class emailVerificationOTP extends Component {
    constructor(props) {
        super(props)
        //state are maintaint for logic
        this.state = {
            genratedOTP: '',
            userOTP: '',
            regitrationEmail: '',
            email: '',
            allUserDetails: [],
            deleteid: ''
        }
        this.onChange = this.onChange.bind(this);
    }
    //common method for inputs changes
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    //collection user data and sending mail for otp
    componentWillMount = () => {
        const { params } = this.props.match;
        console.log(params.email);
        const email = params.email;
        this.setState({ regitrationEmail: params.email })
        //here otp is generated and go to OTPgenrator function
        this.OTPgenerator(email);
        axios.get('http://localhost:5000/userDetails/allUserDetails')
            .then(res => {
                this.setState({ allUserDetails: res.data });
            });
    }
    //Random OTP is generated and send to user email for verifcation
    OTPgenerator = (email) => {
        var email1 = email;
        var email2 = this.state.regitrationEmail
        //RandomOTP is generated here
        var val = Math.floor(1000 + Math.random() * 9000);
        this.setState({ genratedOTP: val })
        var details = {}
        if (email1 == "") {
            details = { email: email2, otp: val }
        }
        else {
            details = { email: email1, otp: val }
        }
        //mail send to user email when this api is called
        axios.post(`http://localhost:5000/emailVerification/emailVerificationOTP`, {
            method: 'POST',
            body: details,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.data.status = "yes") {
                    alert("OTP Send To Your Email")

                }
                else {

                    alert("OTP Not Send")
                }
            });

    }
    //after sending the otp on mail then input  otp is match with the  generator otp and resigter the data
    verifyOTP = () => {
        const userOtp1 = parseInt(this.state.userOTP);
        console.log(userOtp1 + "   " + typeof (userOtp1))
        if (userOtp1 == this.state.genratedOTP) {
            this.state.allUserDetails.map(user => {
                if (user.email == this.state.regitrationEmail && user.isConfirmed == false) {
                    const confirmed = { id: user._id, isConfirmed: true };
                    axios.put(`http://localhost:5000/userDetails/updateUserConfirmed`, {
                        method: 'POST',
                        body: confirmed,
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(res => {
                            if (res.data.status = "yes") {
                                console.log("Update isConfirmed true")
                                alert("Regitration... Succefully... Please Login.....")
                                this.props.history.push("/Login")
                            }
                            else {
                                alert("No Regitration");
                                console.log(res.data.status)
                            }
                        });
                }
            })
        }
        else {
            alert("Incorrect OTP");
        }
    }
    //when user don't want to register then he presss cancle button and all regitration data of current user will be deleted
    cancle = () => {
        this.state.allUserDetails.map(user => {
            const id = user._id
            if (user.email == this.state.regitrationEmail && user.isConfirmed == false) {
                axios.delete(`http://localhost:5000/userDetails/deleteUser/${id}`)
                    .then(res => {
                        if (res.data.status = "yes") {
                            console.log("delete user due to cancle")
                            this.props.history.push("/Home")
                        }
                        else {
                            console.log("Not delete user due to cancle")
                        }
                    });
            }


        })
    }
    render() {
        return (
            <div>
                <div className="form-group container ">
                    <center>
                        <center className="border border-black m-5 col-md-6 bcolor">
                            <form >
                                <div className="col-md-10  m-3">
                                    <label className="m-3 float-left">OTP : </label>
                                    <input type="number" name="userOTP" value={this.state.userOTP} onChange={this.onChange} placeholder="OTP" className="form-control"></input>
                                    <p className="p">Please check Your Email and Enter OTP</p>
                                </div>
                                <br />
                                <span>
                                    <button type="button" className="btn btn-success mb-5" onClick={this.verifyOTP}>Verify</button>&nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btn btn-info mb-5" onClick={this.OTPgenerator}>Resend OTP</button>&nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btn btn-danger mb-5" onClick={this.cancle}>Cancle</button>

                                </span>
                            </form>
                        </center>
                    </center>
                </div>
            </div>
        )
    }
}

export default emailVerificationOTP
