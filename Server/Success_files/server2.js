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

app.post('/api/tours', (req, res) => {
    const tourData = req.body;
  
    // Create a new tour using the Tour model
    const newTour = new Tour(tourData);
  
    // Save the tour to MongoDB using promises
    newTour.save()
      .then(savedTour => {
        res.status(201).json(savedTour);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
