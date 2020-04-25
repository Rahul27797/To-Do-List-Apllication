const mongoose = require("mongoose");
//creating schema for task details
var taskListSchema = new mongoose.Schema({
    firstName : {type:String , required: [true, "can't be blank"]},
    lastName : {type:String , required: [true, "can't be blank"]},
    userId : 
    [
        {type: mongoose.Schema.Types.ObjectId,ref:'userdetails'}
    ],
    title : {type:String , required: [true, "can't be blank"]},
    discription :{type:String , required: [true, "can't be blank"]},
    email :{type:String , required: [true, "can't be blank"]},
    dateOfAdddingTask:{type:Date,default : Date.now},
    status : Boolean
})

var taskListdetails = mongoose.model("tasklists",taskListSchema) ;

module.exports = {taskListdetails};