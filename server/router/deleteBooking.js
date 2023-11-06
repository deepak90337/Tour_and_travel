const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const cors = require('cors'); 
// const dotenv = require('dotenv');
const express = require('express');

const Booking = require("../model/bookingSchema");

// dotenv.config({ path: './config.env' });

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function deleteBooking(req, res) {
    console.log("request body in delebooking",req.params);
  const booking = await Booking.findByIdAndDelete(req.params.bookingId);
  console.log(req.params.bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found." });
  }

  // Delete the booking from the database

  res.status(200).json({ message: "Booking deleted successfully." });
};

module.exports = {deleteBooking};
