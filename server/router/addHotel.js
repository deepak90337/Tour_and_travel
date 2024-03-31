const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const hotelb = require('../model/hotelbookingSchema');

const app = express();
app.use(cors());
// Parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB Atlas

async function hotelbooking(req, res) {
  const { name,email,date1 ,hotel_name,
          hotel_type ,no_of_guest ,check_in ,check_out,
          hotel_price } = req.body.formData;

    console.log(req.body);  
    // res.status(200).send({msg:"hello hotelbooking"});
    const newBooking = new hotelb({
      name,
      email,
      date1 ,
      hotel_name,
      hotel_type ,
      no_of_guest ,
      check_in ,
      check_out,
      hotel_price
    
    });

    if (name == '' || email == ''|| date1 == ''|| hotel_name == ''|| hotel_type == ''|| hotel_type == 'select'||
    no_of_guest == ''|| check_in == ''|| check_out== ''|| hotel_price == '') {
      return res.status(400).json({error:"Enter Valid Value in fields"})
    }
  // Create a new tour using the Tour model
  const newHotelBooking = new hotelb(newBooking);

  // Save the tour to MongoDB using promises
  newHotelBooking.save()
    .then(savedTour => {
      res.status(200).json(savedTour);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
  

module.exports = {
    hotelbooking
  };
  