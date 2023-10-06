const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Booking = require('../model/bookingSchema'); // Assuming tour.js is in the same folder as server.js
const cors = require('cors'); 
const mongoose = require('../DB/conn');
const BookingSchema = require('../model/bookingSchema');

const app = express();
app.use(cors());
// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB Atlas

async function booking(req, res) {
  const { name, email,date1 ,
    selectedDestination,
    flight ,
    atime ,
    dtime } = req.body.formData;

    console.log(req.body.formData);  
    //const tourData = req.body;
  console.log(req.body.price);
  const price = req.body.price;
    const newBooking = new Booking({
      name,
      email,
      date1 ,
    selectedDestination,
    flight ,
    atime ,
    dtime ,
    price
    
    });
  // Create a new tour using the Tour model
  const newTour = new Booking(newBooking);

  // Save the tour to MongoDB using promises
  newTour.save()
    .then(savedTour => {
      res.status(200).json(savedTour);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

// Create a route to handle the incoming POST request
//app.post('/api/addbooking', (req, res) => {})
  

module.exports = {
    booking
  };
  