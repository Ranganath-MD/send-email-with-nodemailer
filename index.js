const express = require("express");
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport')
const port = 8080;
const path = require("path")
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'));
})

app.post("/email", (req, res) => {
    const { email } = req.body
    console.log(email)
    // Create a Nodemailer transporter using smtpTransport
    const transporter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "ranganath.developer@gmail.com",       // replace with sender email
            pass: process.env.PASSWORD  // replace with sender password
        }
    }))

    transporter.sendMail({
        from: "ranganath.developer@gmail.com",     //replace with sender email
        to: email,
        subject: "Message from Ranganath ✌",
        text: "If you get this mail, means you are testing the functionality of my code. I got You🤷‍♂️😂", // plain text body

    });
    res.send({
        message: "Mail sent succesfully",
    })
})



app.listen(port, () => {
    console.log("app listening on the port", port)
})