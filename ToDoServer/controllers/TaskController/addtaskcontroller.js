const express = require("express");
var router = express.Router();
var { taskListdetails } = require("../../models/TaskModel/addTaskDetails");

//get all task details
router.get("/allUserTask", (request, response) => {
    taskListdetails.find((err, docs) => {
        if (!err) {
            response.send(docs);
            response.end();
        }
        else {
            response.send(err);
        }
    })
});
//getting current user task
router.get("/currentUserTask/:id", (request, response) => {
    var id = request.params.id;
    taskListdetails.find({ userId: id }, (err, docs) => {
        if (!err) {
            response.send(docs);
            response.end();
        }
        else {
            response.send(err);
        }
    })
});
//calculating user task
router.get("/taskUpdate/:id", (request, response) => {
    var id = request.params.id;
    taskListdetails.findById(id, (err, docs) => {
        if (!err) {
            response.send(docs);
            response.end();
        }
        else {
            response.send(err);
        }
    })
});
//adding task 
router.post("/addTask", (request, response) => {
    let addTaskDetails = request.body;
    var newTask = new taskListdetails({
        firstName: addTaskDetails.body.firstname,
        lastName: addTaskDetails.body.lastname,
        userId: addTaskDetails.body.id,
        title: addTaskDetails.body.title,
        discription: addTaskDetails.body.discription,
        email: addTaskDetails.body.email,
        status: false
    })

    newTask.save((err, docs) => {
        if (err) {
            response.send({ error: err });
            response.end();
        }
        else {
            response.send({ status: "yes" });
        }
    })
})
//updating the task
router.put("/updateTaskDetailsOfUser", (request, response) => {
    let user = request.body;
    const id = user.body.id;
    taskListdetails.findByIdAndUpdate(id, { $set: { status: user.body.status } }, (err, doc) => {
        if (!err) {
            response.send({ status: "yes" });
            response.end();
        }
        else {
            response.send(err);
        }
    })
})
router.put("/updateOneTask", (request, response) => {
    let user = request.body;
    const id = user.body.id;
    const status = false
    taskListdetails.findByIdAndUpdate(id, { $set: { status: status, title: user.body.title, discription: user.body.discription } }, (err, doc) => {
        if (!err) {
            response.send({ status: "yes" });
            response.end();
        }
        else {
            response.send(err);
        }
    })
})
//update the task
router.put("/updateOneTask", (request, response) => {
    console.log("upDate called from server for task")
    let user = request.body;
    const id = user.body.id;
    const status = false
    taskListdetails.findByIdAndUpdate(id, { $set: { status: status, title: user.body.title, discription: user.body.discription } }, (err, doc) => {
        if (!err) {
            response.send({ status: "yes" });
            response.end();
        }
        else {
            response.send(err);
        }
    })
})
//updating task is completed or not
router.put("/completeOneTask", (request, response) => {
    let user = request.body;
    const id = user.body.id;
    const completed = user.body.completed;
    taskListdetails.findByIdAndUpdate(id, { $set: { status: completed } }, (err, doc) => {
        if (!err) {
            response.send({ status: "yes" });
            response.end();
        }
        else {
            response.send(err);
        }
    })
})

module.exports = router;