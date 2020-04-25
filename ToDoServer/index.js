//main file server start with this file
require("./db");
const express = require("express");
const bodyparser = require("body-parser");
var cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyparser.json());

const userdetail = require("./controllers/UserControllers/userDetailsController");
const lastlogindetails = require("./controllers/UserControllers/lastLoginController");
const taskdetails = require("./controllers/TaskController/addtaskcontroller");
const emailverification =require("./controllers/UserControllers/emailVerficationController");

//changing the port for server
app.listen(5000,()=>console.log("Server started On port 5000"));

app.use("/userDetails",userdetail);
app.use("/lastlogindetails",lastlogindetails);
app.use("/addTaskDetails",taskdetails);
app.use("/emailVerification",emailverification);
