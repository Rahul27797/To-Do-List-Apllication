import React, { Component } from 'react'
import axios from "axios";
import PieChart from 'react-minimal-pie-chart';
export class adminLoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLoginUserDetails: {},
            currentLoginUserTaskDetails: []
        }
    }
    //collecting current Admin data and task data
    componentWillMount = () => {
        const { params } = this.props.match;
        const id = params.id;
        axios.get(`http://localhost:5000/userDetails/currentLoginUserDetails/${id}`)
            .then(res => {
                this.setState({ currentLoginUserDetails: res.data });
            });
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
                this.setState({ loading: false })

            });

    }
    //When Admin clike on add task this fuction is called and gose to add task component
    addTask = () => {
        this.props.history.push(`/addTask/${this.state.currentLoginUserDetails._id}`);
    }
    //when Admin clike on update profile then this functio is called on and go to update user component
    updateUserDetails = () => {
        this.props.history.push(`/updateUserDetails/${this.state.currentLoginUserDetails._id}`);
    }

    //updating the task of current user 
    editCurretnUserTask = (e) => {
        const id = e.target.value;
        this.props.history.push(`/editCurrentUserTask/${id}`);

    }
    //dendering the task on screen this fuction is called
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
                    <td scope="row"><input type="checkbox" value={_id} defaultChecked={status} onChange={this.updateChekBox} />    {cheked}</td>
                    <td scope="row"><button type="button" className="btn btn-info" value={_id} onClick={this.editCurretnUserTask}>Edit</button></td>
                </tr>
            )

        });
    }
    //when Admin click on logout button this function is called and goes to home component
    userLogout = () => {
        this.props.history.push(`/Home`);
    }
    //when user Admin click on viewuser button this function is called and goes to viewuser component
    viewUsers = () => {
        const id = this.state.currentLoginUserDetails._id;
        this.props.history.push(`/viewusers/${id}`);
    }
    //when Admin clicke on viewgraph button this function is called and goes to graph component
    viewGraph = () => {
        this.props.history.push(`/graph/${this.state.currentLoginUserDetails._id}`);
    }
    render() {

        return (
            <div>
                <div class="container-fluid ">
                    <h3 class="ulph3 col-12 ">
                        <span class="left ">Hi Admin ,{this.state.currentLoginUserDetails.firstName}</span>
                        <p class="right-align">
                            <span class="right-align">
                                <button type="button" className="btn btn-info" onClick={this.updateUserDetails}>Profile</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" className="btn btn-danger red" onClick={this.userLogout}>Log Out</button>
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
                        <button type="button" className="btn btn-primary  m-3" onClick={this.addTask}>Add Task</button>
                        <button type="button" className="btn btn-info  m-3" onClick={this.viewUsers}>View Users</button>
                        <button type="button" className="btn btn-info  m-3" onClick={this.viewGraph}>View Graph</button>
                    </nav>
                </div>
                <br />
                <div class="table-responsive">
                    <form>
                        <center >
                            <table Class="table table-hover ">
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

export default adminLoginPage
