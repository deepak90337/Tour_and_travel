const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()
app.use(cors());


async function sendMail(req,res){
    try {
        const {userName,userEmail,subject,message} = req.body
        const textBody = `
        Name: ${userName}
        Email: ${userEmail}
    
        Message: ${message}
        `
        console.log("email data",req.body);
        const transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port: 587,
            // secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: process.env.SMTP_EMAIL,
              pass: "sfra hbeb cplq afiq",
            },
          });

          var mailOptions={
            from :process.env.SMTP_EMAIL,
            to:userEmail,
            subject:subject,
            text:textBody
          }

          transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                res.status(400).send({message:"email not sent"})
                console.log(err)
            }else{
                console.log("Email Sent")
            }
          })

      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error uploading file' });
      }
  
};

module.exports ={sendMail};