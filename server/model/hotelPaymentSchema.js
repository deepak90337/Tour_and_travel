const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelPaymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type:String,
        required:true
    },
    razorpay_payment_id: {
        type:String,
        required:true
    }, 
    razorpay_signature : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    h_id : {
        type: Schema.Types.ObjectId,
        ref: 'hotel_bookings'
    }
   
}, { timestamps: true });

const HotelPayment = mongoose.model('HotelPayment',HotelPaymentSchema);//user_info is collection name and mongodb atlas will create user_infos (plural)

module.exports = HotelPayment;