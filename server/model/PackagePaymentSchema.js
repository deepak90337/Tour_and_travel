const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackagePaymentSchema = new mongoose.Schema({
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
    b_id : {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }
   
}, { timestamps: true });

const PackagePayment = mongoose.model('PackagePayment',PackagePaymentSchema);//user_info is collection name and mongodb atlas will create user_infos (plural)

module.exports = PackagePayment;