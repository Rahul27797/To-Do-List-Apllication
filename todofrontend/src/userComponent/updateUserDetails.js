import React, { Component } from 'react'
import axios from "axios";
//this component is called when user click on profilr button
export class updateUserDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currentLogingUserId : '',
            currentLoginUserDetails : {},
            firstname : '',
            lastname : '',
            password : '',
            cpassword : '',
            isAdmin : ""
             
        }
    }
    //common method for input changes
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    //collecting current user data to show in inputes
    componentWillMount = () => {
        const { params } = this.props.match;
        const id = params.id;
        this.setState({ currentLogingUserId: id });
        axios.get(`http://localhost:5000/userDetails/currentLoginUserDetails/${id}`)
            .then(res => {
                this.setState({ currentLoginUserDetails: res.data });
                this.setState({firstname : res.data.firstName});
                this.setState({lastname : res.data.lastName});
                this.setState({password : res.data.password});
                this.setState({cpassword : res.data.cpassword});
                this.setState({isAdmin : res.data.isAdmin});
            });
    }

    //when user change the data in input the this function is called
    updateUserdetails = () =>
    {//stting the objrct with new data filled in inputs
        const UserNewDetalis =
        {
            id : this.state.currentLogingUserId,
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            password : this.state.password,
            cpassword : this.state.cpassword,
        }

        if(this.state.password == this.state.cpassword)
        {
            axios.put(`http://localhost:5000/userDetails/updateUserDetails` ,
            {
                method: 'put',
                body:UserNewDetalis,
                headers: { 'Content-Type' : 'application/json' }})  
                     .then(res=>
                    {
                        if(res.data.status="yes")
                        {
                                 alert("succefully update")
                                 if(this.state.isAdmin == false) 
                                 {
                                 this.props.history.push(`/userloginpage/${this.state.currentLogingUserId}`)
                                 }
                                 else
                                 {
                                    this.props.history.push(`/adminLoginPage/${this.state.currentLogingUserId}`);
                                 }
                        }
                        else{
                            alert(res.err)
                        }
                    })
                }
        else
        {
            alert("password And Confirm Password Does not match");
        }
    }
    back = () =>
    {
       if(this.state.currentLoginUserDetails.isAdmin == false)
       {
        this.props.history.push(`/userloginpage/${this.state.currentLoginUserDetails._id}`)
       }
       else
       {
        this.props.history.push(`/adminLoginPage/${this.state.currentLoginUserDetails._id}`);
       }
    }
    render() {
        return (
            <div>
                <div className="form-group container ">
                <center>
                    
                    <center className="border1 m-5 col-md-6 border2">
                    <h3 className="m-3 h3color">Update Your Profile</h3>
                        <form >
                            <div className="col-md-10  m-3">

                                <label className="m-3 float-left">FirstName : </label>
                                <input type="text" name="firstname" value={this.state.firstname} onChange={this.onChange} placeholder="FirstName" className="form-control"></input>

                            </div>
                            <div className="col-md-10  m-3 ">
                                <label className="m-3 float-left">LastName :</label>
                                <input type="text" name="lastname" value={this.state.lastname} onChange={this.onChange} placeholder="LastName" className="form-control"></input>

                            </div>
                            <div className="col-md-10  m-3 ">
                                <label className="m-3 float-left">Password :</label>
                                <input type="text" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" className="form-control"></input>

                            </div>
                            <div className="col-md-10  m-3 ">
                                <label className="m-3 float-left">Cinfirm Password :</label>
                                <input type="text" name="cpassword" value={this.state.cpassword} onChange={this.onChange} placeholder="Confirm Password" className="form-control"></input>

                            </div>
                            <br />

                            <button type="button" className="btn btn-primary m-3" onClick={this.updateUserdetails}>Update</button>
                            <button type="button" className="btn btn-success "  onClick={this.back}>Back</button>
                        </form>
                    </center>
                </center>
            </div> 

            </div>
        )
    }
}

export default updateUserDetails
