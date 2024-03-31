const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const razorpay = require('razorpay')
const dotenv = require('dotenv')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
dotenv.config()


// const paymentSchema = require('../model/PackagePaymentSchema');
const razorInstance = new razorpay({
  key_id:process.env.RAZORPAY_ID_KEY,
  key_secret:process.env.RAZORPAY_SECRET_KEY
})

async function checkout(req,res){
    try {
      const {amount} = req.body;
      const amountWithoutSymbol = amount.replace(/[^0-9.]/g, '');
      console.log("checkout js",amountWithoutSymbol)
       const options={
        amount:amountWithoutSymbol*100,
        currency:"INR",
        receipt:"test1"
       }
       const order =await razorInstance.orders.create(options)
        if(!order.error){
          res.status(200).send({
            success:true,msg:"order created",order,contact:"7990890337",name:"abc",email:"abc@gmail.com"
          })
        }else{
          res.status(400).send({success:false,msg:'something went wrong'})
        }
 
       console.log(order)
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error uploading file' });
      }
  
};

module.exports ={checkout};