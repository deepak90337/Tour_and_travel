
const  hotelb = require('../model/hotelbookingSchema');
const User = require('../model/adduserschema');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const cors = require('cors'); 
const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
dotenv.config({ path: './config.env' });

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function getHotelBooking(req, res) {
    try {
        const token = req.body.token;
       // Verify the JWT token and extract the user's email
        const decoded = jwt.verify(token, "deepak90337");
        const userId = decoded.userId;
        const user = await User.findById(userId);
        const userEmail = await user.email;
    //   console.log("emailr -->",userEmail);
        // Find tours associated with the provided email
        const tours = await hotelb.find({ email : userEmail});
    
        // Send tour details as response
        res.json(tours);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving Hotel Bookings' });
      }

}

module.exports = {getHotelBooking};