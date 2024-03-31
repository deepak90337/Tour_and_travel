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
    selectedDestination : {
        type:String,
        required:true
    },
    flight:{
        type:Number,
        required:false
    } ,
    atime : {
        type:String,
        required:false
    },
    dtime : {
        type:String,
        required:false
    },
    isPaymentDone: { 
        type: Boolean, 
        default: false 
    },
    price : {
        type:String,
        required:false
    },
}, { timestamps: true });

  const Booking = mongoose.model('bookings',BookingSchema);//user_info is collection name and mongodb atlas will create user_infos (plural)

module.exports = Booking;
  