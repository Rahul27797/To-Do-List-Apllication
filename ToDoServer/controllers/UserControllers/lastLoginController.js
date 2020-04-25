const express = require("express");
var router = express.Router();
var { logindetails } = require("../../models/UserModel/loginDetails");
//collecting all lastlogingdetails
router.get("/lastLoginDetails", (request, response) => {
  logindetails.find((err, docs) => {
    if (!err) {
      console.log(docs)
      response.send(docs);
    }
    else {
      console.log("Error while retriving data");
    }
  })
});
//when user log in last log in details are saved
router.post("/userLastLogin", (request, response) => {
  let newUser = request.body;
  var newRecord = new logindetails({
    firstname: newUser.body.firstname,
    userId: newUser.body.id,
    email: newUser.body.email,
  })
  newRecord.save((err, docs) => {
    if (err) {
      response.send({ error: err });
    }
    else {
      response.send({ status: "yes" });
    }
  })
})
module.exports = router;