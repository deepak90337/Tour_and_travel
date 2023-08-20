const express = require('express');
const bodyParser = require('body-parser');
const Tour = require('../model/userSchema'); // Assuming tour.js is in the same folder as server.js
const cors = require('cors'); 
const mongoose = require('../DB/conn');
const { loginUser } = require('./test_login2');

const app = express();
const port = 5000;
app.use(cors());
// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB Atlas
app.post('/api/login', async (req, res) => {
  await loginUser(req, res); // Use the loginUser function from test-login.js
});
// Create a route to handle the incoming POST request
app.post('/api/tours', (req, res) => {
  const tourData = req.body;

  // Create a new tour using the Tour model
  const newTour = new Tour(tourData);

  // Save the tour to MongoDB using promises
  newTour.save()
    .then(savedTour => {
      res.status(200).json(savedTour);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
    console.log(req.body);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});