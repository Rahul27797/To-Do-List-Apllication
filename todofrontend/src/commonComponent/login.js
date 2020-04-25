import React, { Component } from 'react';
import axios from "axios";
//Login Form
export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",      //Input User Email
            password: "",      // Input User Password
            allUserDetails: []
        }
        this.onChange = this.onChange.bind(this);
    }
    //Common On Change Method For All Inputs
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    //This LifeCycle Method For Collecting Data For Verification Of Mail And Password
    componentWillMount = () => {

        axios.get('http://localhost:5000/userDetails/allUserDetails')
            .then(res => {
                this.setState({ allUserDetails: res.data });
            });

    }
    //This Is On Click Event Function  For  Cheking Email and Password valid Or Not
    checkUserValid = () => {
        //this.props.history.push(`/userloginpage/${1}`)

        const Userusername = this.state.username;
        const Userpassword = this.state.password;
        const Alluserdetails = this.state.allUserDetails;
        let a = false;

        for (var user of Alluserdetails) {
            //Checking user Activate Or Deactivate
            if (Userusername == user.email && Userpassword == user.password && user.isActive === false) {
                alert("Your Account Is Deactiveted");
                a = true;
                // this.props.history.push(`/Home`);

            }
            // Condition for Login id admin or not
            else if (Userusername == user.email && Userpassword == user.password && user.isAdmin === false) {
                alert("Login Sucessfully....");
                console.log("from login" + user._id);
                a = true;
                var userdetails = { email: user.email, id: user._id, firstname: user.firstName }
                //this method called for last laging information
                this.lastLogonDetails(userdetails);
                this.props.history.push(`/userloginpage/${user._id}`);
            }
            //if it is admin then Going to Admin Profile
            else if (Userusername == user.email && Userpassword == user.password && user.isAdmin === true) {
                a = true;
                // const userdetails =  {email :user.email , id :user._id , firstname : user.firstName}
                this.props.history.push(`/adminLoginPage/${user._id}`);
            }
        }
        if (a === false) {

            alert("Invalid Username And Password");
        }
    }

    lastLogonDetails = (e) => {

        // Last Login detail Api called and save data in DB

        const user = { email: e.email, id: e.id, firstname: e.firstname }
        axios.post(`http://localhost:5000/lastlogindetails/userLastLogin`, {
            method: 'POST',
            body: user,
            headers: { 'Content-Type': 'application/json' }
        })


    }


    render() {
        return (

            <div className="form-group container center ">
                <center>
                    <h3>Log In</h3>
                    <center className="border1 m-5 col-md-6 ">
                        <div class="row">
                            <form class="col-md-10 m-5 ">
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input type="text" name="username" value={this.state.username} onChange={this.onChange} placeholder="UserName" className="form-control validate"></input>

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12 ">
                                        <input type="text" class="validate" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" className="form-control"></input>

                                    </div>
                                </div>

                                <button type="button" className="btn btn-primary m-3" onClick={this.checkUserValid}>Log In</button><br />
                            </form>
                        </div>


                    </center >
                </center >
            </div >
        )
    }
}

export default Login
