const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
app.use(bodyParser.json());
app.use(cors());

dotenv.config({ path: './config.env' });
const Booking = require('../model/bookingSchema'); // Replace with your tour model
const User = require('../model/adduserschema');
async function showBooking(req, res) {
  
  try {
    const token = req.body.token;
// console.log("show booking",token);    // Verify the JWT token and extract the user's email
    const decoded = jwt.verify(token, "deepak90337");
    const userId = decoded.userId;
    const user = await User.findById(userId);
    const userEmail = await user.email;
  // console.log("emailr -->",req.body);
    // Find tours associated with the provided email
    const tours = await Booking.find({ email : userEmail});

    // Send tour details as response
    res.json(tours);
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Unauthorized: Token expired' });
    } else {
      res.status(500).json({ message: 'Error retrieving tours' }); // Generic error for other issues
    }
  }
};

module.exports = {showBooking};
