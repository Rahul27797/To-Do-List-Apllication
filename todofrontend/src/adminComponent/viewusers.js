import React, { Component } from 'react'
import axios from "axios";
export class viewusers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allUserDetails: [],
            id : ""

        }
    }
//collecting all user data for showing information to admin
    componentWillMount = () => {
        const { params } = this.props.match;
       this.setState({id : params.id});
        console.log("component will mount from viewuser")
        axios.get('http://localhost:5000/userDetails/allUserDetails')
            .then(res => {
                this.setState({ allUserDetails: res.data });
            });
    }
//for new data after updation
    Update = () => {
        axios.get('http://localhost:5000/userDetails/allUserDetails')
            .then(res => {
                this.setState({ allUserDetails: res.data });
            });

    }
//Active or Deactive the user function
    changeActivation = (e) => {
        const userActivation = { id: e.target.value, name: e.target.name }
        axios.put(`http://localhost:5000/userDetails/updateUserActivation`,
            {
                method: 'put',
                body: userActivation,
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                if (res.data.status = "yes") {
                    alert("succefully update")
                    //this.props.history.push(`/viewusers`);
                    this.Update();
                }
                else
                 {
                    alert(res.err)
                }
            })
    }
//calculating user information to show on table
    renderTaskData = () => {
        return this.state.allUserDetails.map((task, index) => {
            const { _id, firstName, lastName, gender, age, dateOfBirth, email, password, cpassword, isAdmin, isActive, dateOfSignup } = task //destructuring
            var dob = dateOfBirth;
            dob = dob.split('T')[0];
            var admin = "False";
            if (isAdmin == true) {
                admin = "True"
            }
            var active = "Activate";
            if (isActive == false) {
                active = "Deactivate"

            }

            return (
                <tr key={_id}>
                    <td scope="row">{index + 1}</td>
                    <td scope="row">{_id}</td>
                    <td scope="row">{firstName}</td>
                    <td scope="row">{lastName}</td>
                    <td scope="row">{gender}</td>
                    <td scope="row">{age}</td>
                    <td scope="row">{dob}</td>
                    <td scope="row">{email}</td>
                    <td scope="row">{password}</td>
                    <td scope="row">{admin}</td>
                    <td scope="row">{active}</td>
                    <td scope="row"><button type="button" className="btn btn-success" value={_id} name="Activate" onClick={this.changeActivation}>Activate</button></td>
                    <td scope="row"><button type="button" className="btn btn-danger" value={_id} name="Deactivate" onClick={this.changeActivation}>Deactivate</button></td>
                </tr>
            )
        });
    }
//back button function
    adminLoginForm = () =>
    {
        this.props.history.push(`/adminLoginPage/${this.state.id}`);
    }

    render() {
        return (
            <div>
                <center>
                    <div>
                        <span>
                    <h3 class="m-5">All User Details</h3>
                    <button type="button" className="btn btn-success float-right m-3"  onClick={this.adminLoginForm}>Back</button>
                    </span>
                    </div>
                    <div class="table-responsive">
                        <form>
                            <center >
                                <table Class="table table-hover center1">
                                    <tr>
                                        <th scope="col">Sr.No</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">FIRST NAME</th>
                                        <th scope="col">LAST NAME</th>
                                        <th scope="col">GENDER</th>
                                        <th scope="col">AGE</th>
                                        <th scope="col">DATE OF BIRTH</th>
                                        <th scope="col">EMAIL</th>
                                        <th scope="col">PASSWORD</th>
                                        <th scope="col">IS ADMIN</th>
                                        <th scope="col">IS ACTIVE</th>
                                        <th scope="col"> ACTIVATE</th>
                                        <th scope="col"> DISACTIVATE</th>
                                    </tr>
                                    {this.renderTaskData()}
                                </table>
                            </center>
                        </form>
                    </div>
                </center>
            </div>
        )
    }
}

export default viewusers
