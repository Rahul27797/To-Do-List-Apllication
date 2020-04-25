import React, { Component } from 'react'
import axios from "axios";
export class addTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLogingUserId: "",
            title: "",
            discription: "",
            currentLoginUserDetails: {}
        }
    }
//common onchange method for inputs
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
//collecting current user data from this function
    componentWillMount = () => {
        const { params } = this.props.match;
        const id = params.id;
        this.setState({ currentLogingUserId: id });
        axios.get(`http://localhost:5000/userDetails/currentLoginUserDetails/${id}`)
            .then(res => {
                this.setState({ currentLoginUserDetails: res.data });
            });
    }
//when user fill the input box and clike on add task buuton then this function is called and save the data
    addTask = () => {
        const currentUserTaskDetails = {
            id: this.state.currentLoginUserDetails._id,
            firstname: this.state.currentLoginUserDetails.firstName,
            lastname: this.state.currentLoginUserDetails.lastName,
            email: this.state.currentLoginUserDetails.email,
            title: this.state.title,
            discription: this.state.discription
        }

        axios.post(`http://localhost:5000/addTaskDetails/addTask`, {
            method: 'POST',
            body: currentUserTaskDetails,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.data.status = "yes") {
                    alert("task added.. Sucessfully...")
                    if(this.state.currentLoginUserDetails.isAdmin == false)
                    {
                    this.props.history.push(`/userloginpage/${this.state.currentLogingUserId}`)
                    }
                    else
                    {
                        this.props.history.push(`/adminLoginPage/${this.state.currentLogingUserId}`);
                    }
                }
                else {
                    alert("Not Added task")
                    this.props.history.push(`/userloginpage/${this.state.currentLogingUserId}`);
                }
            });

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
            <div className="form-group container ">
                <center>
                    <center className="border1 m-5 col-md-6 border2">
                        <form >
                            <div className="col-md-10  m-3">

                                <label className="m-3 float-left">Title : </label>
                                <input type="text" name="title" value={this.state.title} onChange={this.onChange} placeholder="Enter Title Of Task" className="form-control"></input>

                            </div>
                            <div className="col-md-10 m-3   ">
                                <label className="m-3 float-left">Discription</label>
                                <textarea type="text" name="discription" value={this.state.discription} onChange={this.onChange} placeholder="Enter Discription Of Task" className="form-control"></textarea>
                            </div>
                            <br />
                            <button type="button" className="btn btn-primary m-3" onClick={this.addTask}>Add Task</button>
                            <button type="button" className="btn btn-success m-3"  onClick={this.back}>Back</button>
                        </form>
                    </center>
                </center>
            </div>
        )
    }
}

export default addTask
