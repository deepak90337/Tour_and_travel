const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const cors = require('cors'); 
// const dotenv = require('dotenv');
const express = require('express');

const hotelb = require("../model/hotelbookingSchema");

// dotenv.config({ path: './config.env' });

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function deleteHotelBooking(req, res) {
    console.log("request body in delebooking",req.params);
  const booking = await hotelb.findByIdAndDelete(req.params.bookingId);
  console.log(req.params.bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found." });
  }

  // Delete the booking from the database

  res.status(200).json({ message: "Booking deleted successfully." });
};

module.exports = {deleteHotelBooking};
