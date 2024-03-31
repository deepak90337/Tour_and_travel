const mongoose = require('mongoose');

// User Schema
const BookingSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    }, 
    date1 : {
        type:String,
        required:true
    },
   hotel_name : {
        type:String,
        required:true
    },
    hotel_type:{
        type:String,
        required:false
    } ,
  no_of_guest : {
        type:String,
        required:false
    },
  check_in: {
        type:String,
        required:false
    },
    check_out: {
        type:String,
        required:false
    },
    hotel_price:{
        type:String,
        required:true
    },
    isPaymentDone: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

  const hotelb = mongoose.model('hotel_bookings',BookingSchema);//user_info is collection name and mongodb atlas will create user_infos (plural)

module.exports = hotelb;
  