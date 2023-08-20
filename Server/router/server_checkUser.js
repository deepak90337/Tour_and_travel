const express = require('express');
const bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');    //---authentication
const bcrypt = require('bcryptjs');
const Tour = require('../model/userSchema');
const mongoose = require('../DB/conn'); 

const app = express();
const port = 5000;

// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB Atlas

// Create a route to handle user login

app.post('/api/tours/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user based on the email provided
    const user = await Tour.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
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
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


