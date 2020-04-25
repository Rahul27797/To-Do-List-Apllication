import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './commonComponent/Home';
import { BrowserRouter as Router, NavLink, Switch, Route } from "react-router-dom";
import Login from './commonComponent/login';
import Signup from './commonComponent/Signup';
import userLoginPage from './userComponent/userLoginPage';
import emailVerificationOTP from './commonComponent/emailVerificationOTP';
import addTask from './userComponent/addTask';
import updateUserDetails from './userComponent/updateUserDetails';
import editCurrentUserTask from './userComponent/editCurrentUserTask';
import adminLoginPage from './adminComponent/adminLoginPage';
import viewusers from './adminComponent/viewusers';
import graph from './adminComponent/graph';

 
//Main Component Of Excecution

function App() {
  return (
   
    <div className="App">
      <Router>
                <nav class>
                    <div class="nav-wrapper ">
                        <a class=" brand-logo ">To Do Appllication</a>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li> <NavLink exact to="/"  >Home</NavLink> &nbsp;&nbsp;&nbsp;&nbsp;</li>
                            <li><NavLink to="/Login" >Log in</NavLink> &nbsp;&nbsp;&nbsp;&nbsp; </li>
                            <li><NavLink to="Signup" >Sing up</NavLink> &nbsp;&nbsp;&nbsp;&nbsp;</li>
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/Home" component={Home}></Route>
                    <Route path="/Login" component={Login}></Route>
                    <Route path="/Signup" component={Signup}></Route>
                    <Route path="/userloginpage/:id" component={userLoginPage}></Route>
                    <Route path="/emailVerificationOTP/:email" component={emailVerificationOTP}></Route>
                    <Route path="/addTask/:id" component={addTask}></Route>
                    <Route path="/updateUserDetails/:id" component={updateUserDetails}></Route>
                    <Route path="/editCurrentUserTask/:id" component={editCurrentUserTask}></Route>
                    <Route path="/adminLoginPage/:id" component={adminLoginPage}></Route>
                    <Route path="/viewusers/:id" component={viewusers}></Route>
                    <Route path="/graph/:id" component={graph}></Route>
                </Switch>
            </Router>
    </div>
  );
}

export default App;
