const express = require("express");
var router = express.Router();

//creating router for calling diff infomation from ui and fill that requirement with this response 
var { userdetails } = require("../../models/UserModel/UserDetails");

//collection all user deatils
router.get("/allUserDetails", (request, response) => {
   userdetails.find((err, docs) => {
      if (!err) {
         // console.log("all user detail"+ docs)
         response.send(docs);
         response.end();
      }
      else {
         response.send(err);
      }
   })
});
//collecting current loging user details
router.get("/currentLoginUserDetails/:id", (request, response) => {
   var id = request.params.id;
   userdetails.findById(id, (err, docs) => {
      if (!err) {
         response.send(docs);
         response.end();
      }
      else {
         response.send(err);
      }
   })
});

//Submiting the registration form and save the data in DB
router.post("/registration", (request, response) => {
   let newUser = request.body;
   var newRecord = new userdetails({
      firstName: newUser.body.firstname,
      lastName: newUser.body.lastname,
      gender: newUser.body.gender,
      age: newUser.body.age,
      dateOfBirth: newUser.body.dateofbirth,
      email: newUser.body.email,
      password: newUser.body.password,
      cpassword: newUser.body.cpassword,
      isActive: true,
      isConfirmed: false
   })

   newRecord.save((err, docs) => {
      if (err) {
         response.send({ error: err });
      }
      else {
         response.send({ status: "yes" });
         response.end();
      }
   })
});
//updating user information
router.put("/updateUserDetails", (request, response) => {
   let user = request.body;
   const id = user.body.id;
   userdetails.findByIdAndUpdate(id, { $set: { firstName: user.body.firstname, lastName: user.body.lastname, password: user.body.password, cpassword: user.body.cpassword } }, (err, doc) => {
      if (!err) {
         response.send({ status: "yes" });
      }
      else {
         response.send(err);
      }
   })
})
//Updating user Activation
router.put("/updateUserActivation", (request, response) => {
   let user = request.body;
   const id = user.body.id;
   var active = false
   if (user.body.name == "Activate") {
      active = true;
   }
   userdetails.findByIdAndUpdate(id, { $set: { isActive: active } }, (err, doc) => {
      if (!err) {
         response.send({ status: "yes" });
      }
      else {
         response.send(err);
      }
   })
})
//after otp is confirm update user isConfirmed
router.put("/updateUserConfirmed", (request, response) => {
   let user = request.body;
   const id = user.body.id;
   var active = user.body.isConfirmed
   userdetails.findByIdAndUpdate(id, { $set: { isConfirmed: active } }, (err, doc) => {
      if (!err) {
         response.send({ status: "yes" });
      }
      else {
         response.send(err);
      }
   })
})
//deleteing the user
router.delete("/deleteUser/:id", (request, response) => {
   const id = request.params.id;
   userdetails.findByIdAndDelete(id, (err, docs) => {
      if (!err) {
         response.send({ status: "yes" });
      }
      else {
         response.send(err);
      }
   })
})

module.exports = router;