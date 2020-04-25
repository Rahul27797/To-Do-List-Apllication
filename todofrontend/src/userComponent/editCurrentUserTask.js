import React, { Component } from 'react'
import axios from "axios";
export class editCurrentUserTask extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             currentUserTask : {},
             title : "",
             discription : "" ,
             currentLoginUserDetails : {}
        }
    }
//comon on change method for inputs
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    //This LifeCycle Method For Collecting Data Of currentuser details and task details
    componentWillMount = () => {
        const { params } = this.props.match;
        const id = params.id;
        axios.get(`http://localhost:5000/addTaskDetails/taskUpdate/${id}`)
            .then(res => {
               this.setState({currentUserTask : res.data});
               this.setState({title : res.data.title});
               this.setState({discription : res.data.discription})
               const id1 = res.data.userId[0];
           

            axios.get(`http://localhost:5000/userDetails/currentLoginUserDetails/${id1}`)
            .then(res => {
                this.setState({ currentLoginUserDetails: res.data });
            });
            });
    
    }
//this function is called for update the new data from input
    updateTask = () =>
    {
         const newTask = {id : this.state.currentUserTask._id , title : this.state.title , discription : this.state.discription}
         axios.put(`http://localhost:5000/addTaskDetails/updateOneTask` ,
         {
             method: 'put',
             body:newTask,
             headers: { 'Content-Type' : 'application/json' }})  
                  .then(res=>
                 {
                     if(res.data.status="yes")
                     {
                              alert("succefully update") 
                              if(this.state.currentLoginUserDetails.isAdmin == false)
                              {
                              this.props.history.push(`/userloginpage/${this.state.currentUserTask.userId}`);
                              }
                              else
                              {
                                this.props.history.push(`/adminLoginPage/${this.state.currentUserTask.userId}`);
                              }
                     }
                     else{
                         alert(res.err)
                     }
                 })
    }
    // if user task is completed then this fuction is called when complete button is clicked
    completedTask = () =>
    {
        const completeTask = { id : this.state.currentUserTask._id ,completed : true}
        axios.put(`http://localhost:5000/addTaskDetails/completeOneTask` ,
        {
            method: 'put',
            body:completeTask,
            headers: { 'Content-Type' : 'application/json' }})  
                 .then(res=>
                {
                    if(res.data.status="yes")
                    {
                             alert("succefully update") 
                             if(this.state.currentLoginUserDetails.isAdmin === false)
                             {
                             this.props.history.push(`/userloginpage/${this.state.currentUserTask.userId}`);
                             }
                             else
                             {
                               this.props.history.push(`/adminLoginPage/${this.state.currentUserTask.userId}`);
                             }
                    }
                    else
                    {
                        alert(res.err)
                    }
                })
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
                            <button type="button" className="btn btn-primary mb-5" onClick={this.updateTask}>Update Task</button>&nbsp;&nbsp;&nbsp;     
                            <button type="button" className="btn btn-primary mb-5" onClick={this.completedTask}>Completed</button>&nbsp;&nbsp;&nbsp; 
                            <button type="button" className="btn btn-success mb-5"  onClick={this.back}>Back</button>
                        </form>
                    </center>
                </center>
            </div>
        )
    }
}

export default editCurrentUserTask
