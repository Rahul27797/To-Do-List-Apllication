require('dotenv').config();
const nodemailer = require('nodemailer');
const express = require("express");
var router = express.Router();

//step 1

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email,
        pass: process.env.Password
    }
});
//sending the verification OTP
router.post("/emailVerificationOTP", (request, response) => {
    let details = request.body;
    let mailoption = {
        from: "rp27797@gmail.com",
        to: "" + details.body.email + "",
        cc: 'rp27797@gmail.com',
        subject: 'To Do List Verification OTP(One Time Passcode)',
        text: "Hiii, For Registration To Do List Application Your OTP Is " + details.body.otp + ""
    };
    transporter.sendMail(mailoption, function (err, data) {
        if (err) {
            response.send({ status: err });
            console.log(err);
        }
        else {
            response.send({ status: "yes" });
            console.log("mail send")
        }
    })
})
module.exports = router;