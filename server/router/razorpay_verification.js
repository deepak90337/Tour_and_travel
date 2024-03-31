const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const razorpay = require('razorpay')
const crypto = require('crypto')
const packageBooking = require('../model/bookingSchema')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



const paymentSchema = require('../model/PackagePaymentSchema');
const razorInstance = new razorpay({
  key_id:process.env.RAZORPAY_ID_KEY,
  key_secret:process.env.RAZORPAY_SECRET_KEY,
})

//create a route to send razorpay key to frontend
async function paymentVerification(req,res){
    try {
       const {razorpay_order_id,razorpay_payment_id,  razorpay_signature,email,b_id}=req.body;
       const body = razorpay_order_id+"|"+razorpay_payment_id;
       const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY).update(body.toString()).digest('hex');
       const isAuth = expectedSignature ===  razorpay_signature;
        console.log("payment verification",isAuth);
        const existingBooking = await packageBooking.findById(b_id);
      if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !email || !b_id){
        return res.status(400).json({ success: false, message: "Try again" });
      }
        if (!existingBooking) {
            return res.status(400).json({ success: false, message: 'payment cannot be verified' });
        }

       if(isAuth){
        await paymentSchema.create({
            razorpay_order_id,razorpay_payment_id,  razorpay_signature,email,b_id
        })
        await packageBooking.findByIdAndUpdate(b_id, { $set: { isPaymentDone: true } });
        // res.redirect(`http://localhost:3000/paymentsuccess?order_id=${razorpay_payment_id}`)
        res.status(200).json({razorpay_order_id})
       }else{
        res.status(400).json({success:false})
       }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error in payment verification' });
      }
  
};

module.exports ={paymentVerification};