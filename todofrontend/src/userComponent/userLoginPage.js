import React, { Component } from 'react'
import axios from "axios";

export class userLoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLoginUserDetails: {},
            currentLoginUserTaskDetails: [],

        }
    }
    //calling this method for collecting data of current user from api
    componentWillMount = () => {
        const { params } = this.props.match;
        const id = params.id;
        // User Details of current login user
        axios.get(`http://localhost:5000/userDetails/currentLoginUserDetails/${id}`)
            .then(res => {

                this.setState({ currentLoginUserDetails: res.data });

            });

        //current User Task Details for diplay on screeen

        axios.get(`http://localhost:5000/addTaskDetails/currentUserTask/${id}`)
            .then(res => {
                this.setState({ currentLoginUserTaskDetails: res.data });


            });
    }

    callUserData = () => {
        const id = this.state.currentLoginUserDetails._id;
        this.renderTaskData();
        axios.get(`http://localhost:5000/userDetails/currentLoginUserDetails/${id}`)
            .then(res => {
                this.setState({ currentLoginUserDetails: res.data });
            });
        axios.get(`http://localhost:5000/addTaskDetails/currentUserTask/${id}`)
            .then(res => {
                this.setState({ currentLoginUserTaskDetails: res.data });
                // console.log(res.data);
                this.setState({ loading: false })

            });

    }
    // add task when user hit the add button
    addTask = () => {
        //calling addtask component
        this.props.history.push(`/addTask/${this.state.currentLoginUserDetails._id}`);
    }
    //update user profile function
    updateUserDetails = () => {
        //calling updateuser component
        this.props.history.push(`/updateUserDetails/${this.state.currentLoginUserDetails._id}`);
    }
    //Adding task Function
    editCurretnUserTask = (e) => {
        const id = e.target.value;
        this.props.history.push(`/editCurrentUserTask/${id}`);

    }
    //rendering Task for Display on Screen
    renderTaskData = () => {
        return this.state.currentLoginUserTaskDetails.map((task, index) => {
            const { _id, title, discription, status } = task //destructuring
            var cheked = "Not Completed";
            if (status === true) {
                cheked = "Completed";
            }
            return (
                <tr key={_id}>
                    <td scope="row">{index + 1}</td>
                    <td scope="row">{title}</td>
                    <td scope="row">{discription}</td>
                    <td scope="row">&nbsp;{cheked}</td>
                    <td scope="row"><button type="button" className="btn btn-info green" value={_id} onClick={this.editCurretnUserTask}>Edit</button></td>
                </tr>
            )
        });
    }
    //when User click on logout bUtton this fuction is called
    userLogout = () => {
        //going to home page
        this.props.history.push(`/Home`);
    }

    render() {
        return (
            <div>
                <div class="container-fluid ">
                    <h3 class="ulph3 col-12 ">
                        <span class="left ">Hi, {this.state.currentLoginUserDetails.firstName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <span class="float-right col-4">{this.state.currentLoginUserDetails.email}</span> */}
                        <p class="right-align">
                            <span class="right-align">
                                <button type="button" className="btn btn-primary m-3 " onClick={this.updateUserDetails}>Profile</button>&nbsp;&nbsp;&nbsp;
                            <button type="button" className="btn btn-danger m-3 red" onClick={this.userLogout}>Log Out</button>
                            </span>
                        </p>

                    </h3><br />
                </div>

                <div class="container-fluid">
                    <h1 class="ulph3 col-12 m-4">
                        <span class="float-center ">To Do List</span>

                    </h1><br />
                </div>

                <div class="container-fluid">
                    <nav class="text-left #ffcdd2 red lighten-4">
                        <button type="button" className="btn btn-primary blue m-3" onClick={this.addTask}>Add Task</button>
                    </nav>
                </div>
                <br />
                <div>
                    <form>
                        <center >
                            <table class="table table-hover striped m-5">
                                <tr>
                                    <th scope="col">Sr.No</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Discription</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Edit</th>
                                </tr>

                                {this.renderTaskData()}
                            </table>
                        </center>
                    </form>
                </div>



                <h6 class="text-leftbottom fixed pl-lg-5 text-secondary">Account Opening Date :  {this.state.currentLoginUserDetails.dateOfSignup} </h6>


            </div>
        )
    }
}

export default userLoginPage
