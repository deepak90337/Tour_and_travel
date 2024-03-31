const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const {verifyToken} = require('../middlewares/jwt_verify.middleware')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const Admin = require('../model/adminSchema');
dotenv.config();

async function editAdminProfile(req,res){
  const token = req.body.token; // Access the user ID from the request body array
  try {
    const decodedToken = await verifyToken(token);
    // If successful, you can use the decoded token data here
    // console.log(decodedToken);
  } catch (error) {
    // Access both status and error
    const { status, error: errorMessage } = error;
    if(status === 401){
      console.error(`Status: ${status}, Error: ${errorMessage}`);
      return res.status(status).json({ error: errorMessage });
    // Handle errors here, you can also send the status code in the response
    }
    
   
  }
  const profilepic = req.file ? req.file.filename || req.body.user_old_pic : req.body.user_old_pic//2-01-23
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.adminId;
  const updatedData = {
    name: req.body.username,
    email: req.body.useremail,
    profile_pic:profilepic
  };
    try {
      if( req.body.username == '' || req.body.useremail == ''){
        return res.status(400).json({ error: 'Enter Some Value' });
      }
      const updatedUser = await Admin.findByIdAndUpdate(userId, updatedData, { new: true });
       console.log("Edit admin profile back",req.body);
      return res.status(200).json(updatedUser);
     
    } catch (error) {
      return res.status(500).json({ error: 'Error updating user' });
    }
}

module.exports = {editAdminProfile}