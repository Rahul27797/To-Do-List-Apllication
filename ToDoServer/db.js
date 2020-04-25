const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ToDoApplication",{ useNewUrlParser: true ,useUnifiedTopology: true },
//connecting to the database to TODOAppliction
err => {
    if(!err)
    {
        console.log("Connected...");
    }
    else
    {
        console.log("Not connected");
    }
});