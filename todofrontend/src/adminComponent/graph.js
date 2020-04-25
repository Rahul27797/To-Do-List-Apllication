import React, { Component } from 'react'
//var Component = React.Component;
import CanvasJSReact from '../assets/canvasjs.react';
import axios from "axios";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class graph extends Component {

    //this are the graph content
    TotalUserRegis = '';
    TotalUserRegisInSeven = 0;
    totalTask = '';
    activeUser = '';

    constructor(props) {
        super(props)

        this.state = {
            cid: '',
            allUserDetails: [],
            lastLoginDetails: [],
            allTaskDetail: []

        }
    }
    //collection data for graph requirement
    componentWillMount = () => {
        const { params } = this.props.match;
        const id = params.id;
        this.setState({ cid: id })
        //api called for all user data
        axios.get('http://localhost:5000/userDetails/allUserDetails')
            .then(res => {
                this.setState({ allUserDetails: res.data });
                this.TotalUserRegistered()
                this.curruntactiveUser()
                this.sevendaysregitration()
            });
        //api called for all task details
        axios.get('http://localhost:5000/addTaskDetails/allUserTask')
            .then(res => {
                this.setState({ allTaskDetail: res.data });
                this.nooftotalTask();
            });
    }
    //calculating to user register till date
    TotalUserRegistered = () => {
        this.TotalUserRegis = this.state.allUserDetails.length;
    }
    //calculating active user in data
    curruntactiveUser = () => {
        var user = this.state.allUserDetails;
        var a = 0;
        user.map(users => {
            if (users.isActive === true) {
                a = a + 1;
            }
        })
        this.activeUser = a;
    }
    //calculating total no of task
    nooftotalTask = () => {
        //    var a = this.state.allTaskDetail.length;
        //    console.log("A  "+a )
        this.totalTask = this.state.allTaskDetail.length;
        return this.totalTask;
    }

    componentDidMount = () => {
        this.nooftotalTask()
    }
    //callculating last seven days registration from current day
    sevendaysregitration = () => {
        var a = 0;
        var user = this.state.allUserDetails;
        user.map(users => {
            var Rdate = new Date(users.dateOfSignup);
            this.calculate(users.dateOfSignup);
        })

    }
    //claculating days function
    calculate = (dateR) => {
        const one_day = 1000 * 60 * 60 * 24
        const today = new Date();
        var birthDate = new Date(dateR);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        const noOfDay = Math.round(today.getTime() - birthDate.getTime()) / (one_day);
        if (noOfDay <= 7) {
            this.TotalUserRegisInSeven = this.TotalUserRegisInSeven + 1;
        }
    }
    totalUserRegInSeven = () => 
    {
        return this.TotalUserRegisInSeven;
    }

    //function of back button
    adminLoginForm = () =>
     {
        this.props.history.push(`/adminLoginPage/${this.state.cid}`);
    }
    render() {
        const options = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Graph for User and Task"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: this.TotalUserRegis, label: "Total User registered" },
                    { y: this.totalUserRegInSeven(), label: "Total User registered in last 7 days" },
                    { y: this.activeUser, label: "Total Active User" },
                    { y: this.nooftotalTask(), label: "Total number of task" },

                ]
            }]
        }

        return (
            <div><CanvasJSChart options={options}
            /* onRef={ref => this.chart = ref} */
            />
                <button type="button" className="btn btn-success float-right m-3" onClick={this.adminLoginForm}>Back</button>

                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default graph;                              