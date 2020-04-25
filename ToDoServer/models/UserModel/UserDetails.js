const mongoose = require("mongoose");
//creating schema foe userdetails.
var UserSchema = new mongoose.Schema({
    firstName : {type:String , required: [true, "can't be blank"]},
    lastName : {type:String , required: [true, "can't be blank"]},
    gender :{type:String , required: [true, "can't be blank"]}, 
    age : {type:Number , required: [true, "can't be blank"]},
    dateOfBirth : {type:Date ,required: [true, "can't be blank"]},
    dateOfSignup:{type:Date,default : Date.now},
    email : {type:String,unique:true,required: [true, "can't be blank"]},
    password : {type:String,required: [true, "can't be blank"]},
    cpassword : {type:String,required: [true, "can't be blank"]},
    isAdmin : {type : Boolean ,default : false},
    isActive : {type : Boolean ,},
    isConfirmed : {type : Boolean},
})


var userdetails = mongoose.model("userdetails",UserSchema) ;
//exporting the userdetails model
module.exports = {userdetails};