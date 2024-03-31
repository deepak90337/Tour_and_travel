const User = require('../model/adduserschema');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); 
const dotenv = require('dotenv');
const express = require('express');

dotenv.config({ path: './config.env' });

const app = express();
app.use(bodyParser.json());
app.use(cors());
async function userProfile(req, res) {
    const token = req.body.token;
  // console.log("profile token : --"+ token);

    if (token == null) {
      console.log("if part ran");
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }else{
      
    try {
      
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.userId;
      // console.log("decoded token of user"+decodedToken);
      // console.log(userId);
      const user = await User.findById(userId);
      if (!user) {
       return res.status(404).json({ message: 'User not found' });
      }
  //url may take pulic/temp   
  //date:1-01-24
      const profileData = {
        name: user.name,
        email: user.email,
        profilePic: `http://localhost:5000/temp/${user.profile_pic}` // Construct full URL
      };
  
  //1-01-24
      return res.status(200).json(profileData);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    }
  
}

module.exports = {
  userProfile
  };
  