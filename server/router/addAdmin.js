  const Admin = require('../model/adminSchema');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); 
const dotenv = require('dotenv');
const express = require('express');


dotenv.config({ path: './config.env' });
const app = express();
app.use(bodyParser.json());
app.use(cors());


 async function Adminadd(req, res) {   
const { name, email, password, cpassword } = req.body;
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    // Check if passwords match
    if (password !== cpassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
  
    try {
      // Call the save() method to save the new user
      const savedAdmin = await new Admin({
        name,
        email,
        password,
        cpassword,
      }).save();
  
      res.status(200).json(savedAdmin);
    } catch (error) {
      res.status(500).json({ error: 'Error adding Admin' });
    }
  };
  


module.exports = {Adminadd};

