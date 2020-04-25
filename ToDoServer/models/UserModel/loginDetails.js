const mongoose = require("mongoose");
//creating schema foe Login details.
var LoginSchema = new mongoose.Schema({
    firstname :  {type:String , required: [true, "can't be blank"]},
    userId : [
        {type: mongoose.Schema.Types.ObjectId,ref:'userdetails'}
    ],
    email :{type:String , required: [true, "can't be blank"]},
    lastLoginDate:{type:Date,default : Date.now}
});

var logindetails = mongoose.model("lastlogins",LoginSchema) ;

module.exports = {logindetails};