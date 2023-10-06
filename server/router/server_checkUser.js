const express = require('express');
//const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');    //---authentication
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Tour = require('../model/userSchema');
const mongoose = require('../DB/conn');
dotenv.config({ path: './config.env' });

const app = express();
const port = 5000;

// Parse JSON request bodies
app.use(bodyParser.json());
app.use(cors());

// Create a route to handle user login

app.post('/api/tours/login', async (req, res) => {
  const { name, password } = req.body;
  console.log(req.body);
  try {
    // Find the user based on the email provided
    const user = await Tour.findOne({ name });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    //const isPasswordMatch = await bcrypt.compare(password, user.password);
   const  isPasswordMatch = () => {
    if(user.password == password){
      return true;
    }
   }
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate and save a new authentication token
    const token = await user.generateAuthToken();
    res.cookie("Jwt_token",token,{
      expires:new Date(Date.now() + 2788678676),
      httpOnly:true             //32 days storing cookie
    });
    // If the password matches, user is authenticated
    // You can create a token or session for the user here
    res.status(200).json({ message: 'Login successful!', token ,username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  // res.json({ username: user.username});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


