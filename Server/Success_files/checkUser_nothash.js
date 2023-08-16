
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const Tour = require('../model/userSchema');

const app = express();
const port = 3000;

// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose
  .connect('mongodb+srv://vishwakarmadeepak59510:deepak90337@cluster0.q3oscss.mongodb.net/User?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas', error);
  });

// Create a route to handle the incoming POST request
app.post('/api/tours', async (req, res) => {
  const { name, password, cpassword } = req.body;     //-------------------------10.48 bcrypt.compare thapa mern

  // Check if both password and cpassword are provided and are the same
  if (!password || !cpassword || password !== cpassword) {
    return res.status(400).json({ error: 'Passwords must match' });
  }

  try {
    // Check if the user already exists based on the username
    const existingUser = await Tour.findOne({ name });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // If all validations are passed, create a new user using the Tour model
    const newUser = new Tour(req.body);

    // Save the new user to MongoDB using async/await
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});