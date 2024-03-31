const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const Useradd = require('../model/adduserschema');

async function editProfile(req,res){
  const token = req.body.token; // Access the user ID from the request body array
  const profilepic = req.file ? req.file.filename || req.body.user_old_pic : req.body.user_old_pic//2-01-23
  const decoded = jwt.verify(token, "deepak90337");
  const userId = decoded.userId;
  const updatedData = {
    name: req.body.username,
    email: req.body.useremail,
    profile_pic:profilepic
  };
    try {
      if( req.body.username == '' || req.body.useremail == ''){
        return res.status(400).json({ error: 'Enter Some Value' });
      }
      const updatedUser = await Useradd.findByIdAndUpdate(userId, updatedData, { new: true });
       console.log(req.body);
      return res.status(200).json(updatedUser);
     
    } catch (error) {
      return res.status(500).json({ error: 'Error updating user' });
    }
}

module.exports = {editProfile}