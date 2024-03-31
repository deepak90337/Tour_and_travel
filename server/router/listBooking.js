
const Booking = require('../model/bookingSchema');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const cors = require('cors'); 
const dotenv = require('dotenv');
const express = require('express');

dotenv.config({ path: './config.env' });

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function listBooking(req, res) {
const {email} = req.body;
if (!email) {
  return res.status(401).json({ message: 'Booking not found' });
}
console.log(email);
// Find the user in the database
const booking = await Booking.find({ email });
console.log(booking);
// If the user is not found, return an error response
if (!booking) {
  return res.status(404).json({ message: 'Booking not found' });
}
else{res.json(booking);}
// Find the bookings associated with the user
// const bookings = await Booking.find({ user: user._id });

// Send the bookings to the frontend

}

module.exports = {listBooking};