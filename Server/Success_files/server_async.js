const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('../router/conn2');
const Tour = require('../model/userSchema');

const app = express();
const port = 3000;

// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB Atlas
connectDB();

// Add a sign-in route
app.post('/api/signin', async (req, res) => {
  const { name, email } = req.body;

   // Check if both username and password are provided
   if (!name || !email) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  // Query the database to find the user with the provided username and password
  try {
    const user = await Tour.findOne({ name, email });
    if (user) {
      // User found, credentials are correct
      res.status(200).json({ message: 'Sign-in successful!' });
    } else {
      // User not found or incorrect credentials
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add other routes (e.g., the POST route for creating tours)

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
