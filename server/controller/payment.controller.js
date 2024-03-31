const packagePayment = require('../model/PackagePaymentSchema');
const razorpay = require('razorpay')
const hotelPayment = require('../model/hotelPaymentSchema')
const hotelb = require('../model/hotelbookingSchema')
const crypto = require('crypto')

const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
const razorInstance = new razorpay({
    key_id:process.env.RAZORPAY_ID_KEY,
    key_secret:process.env.RAZORPAY_SECRET_KEY
  })
  
const getPackagePayment = async (req, res) => {
    try {
        // Perform the aggregation
        const result = await packagePayment.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'b_id', // Match on the b_id field in the Payment collection
                    foreignField: '_id', // Match with the _id field in the Bookings collection
                    as: 'bookingDetails'
                }
            },
            {
                $unwind: '$bookingDetails' // Unwind the bookingDetails array
            },
            {
                $project: {
                    _id: 0,
                    razorpay_order_id: 1,
                    createdAt:1,
                    'bookingDetails.email': 1,
                    'bookingDetails.selectedDestination': 1,
                    'bookingDetails.price': 1,
                    'bookingDetails.date1': 1,
                    'bookingDetails.isPaymentDone': 1,
                }
            }
        ]).exec();

        // Send the result as a response
        res.status(200).json(result);
    } catch (err) {
        // Handle errors
        console.error('Error occurred while fetching data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


async function hotelcheckout(req, res) {
  try {
    const { amount } = req.body;
    // Remove currency symbol and comma separator
   

    console.log("hotel checkout js", req.body);

    const options = {
      amount:amount*100, // Convert to number and multiply by 100
      currency: "INR",
      receipt: "test1"
    };
    console.log(options);

    const order = await razorInstance.orders.create(options);

    if (!order.error) {
      console.log("everything fine in payment cont.");
      return res.status(200).send({
        success: true,
        msg: "order created",
        order,
        contact: "7990890337",
        name: "abc",
        email: "abc@gmail.com"
      });
    } else {
      res.status(400).send({ success: false, msg: 'something went wrong' });
    }

    console.log(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error uploading file' });
  }
}

  

  async function hotelpaymentVerification(req,res){
    try {
       const {razorpay_order_id,razorpay_payment_id,  razorpay_signature,email,h_id}=req.body;
       const body = razorpay_order_id+"|"+razorpay_payment_id;
       const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET_KEY).update(body.toString()).digest('hex');
       const isAuth = expectedSignature ===  razorpay_signature;
        console.log("payment verification",isAuth);
        const existingBooking = await hotelb.findById(h_id);

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !email || !h_id){
          return res.status(400).json({ success: false, message: "Try again" });
        }
        if (!existingBooking) {
            return res.status(400).json({ success: false, message: 'payment cannot be verified' });
        }

       if(isAuth){
        await hotelPayment.create({
            razorpay_order_id,razorpay_payment_id,  razorpay_signature,email,h_id
        })
        await hotelb.findByIdAndUpdate(h_id, { $set: { isPaymentDone: true } });
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


const getHotelPayment = async (req, res) => {
  const { email } = req.body; // Assuming the email value is sent in the request body

  try {
      // Perform the aggregation
      const result = await hotelPayment.aggregate([
          {
              $lookup: {
                  from: 'hotel_bookings',
                  localField: 'h_id', // Match on the b_id field in the Payment collection
                  foreignField: '_id', // Match with the _id field in the Bookings collection
                  as: 'bookingDetails'
              }
          },
          {
              $unwind: '$bookingDetails' // Unwind the bookingDetails array
          },
          {
            // name,email, date1 ,hotel_name, hotel_type ,no_of_guest ,
            // check_in ,check_out,hotel_price
              $project: {
                  _id: 0,
                  razorpay_order_id: 1,
                  createdAt:1,
                  'bookingDetails.email': 1,
                  'bookingDetails.hotel_name': 1,
                  'bookingDetails.hotel_price': 1,
                  'bookingDetails.date1': 1,
                  'bookingDetails.isPaymentDone': 1,
              }
          }
      ]).exec();

      // Send the result as a response
      res.status(200).json(result);
  } catch (err) {
      // Handle errors
      console.error('Error occurred while fetching data', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const paymentEmail = async (req, res) => {
  try {
    const {userName,userEmail,subject,message} = req.body
    const textBody = `
    Name: ${userName}
    Email: ${userEmail}

    Message: ${message}
    `
    console.log("email data",req.body);
    const transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port: 587,
        // secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.SMTP_EMAIL,
          pass: "sfra hbeb cplq afiq",
        },
      });

      var mailOptions={
        from :process.env.SMTP_EMAIL,
        to:userEmail,
        subject:subject,
        text:textBody
      }

      transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            res.status(400).send({message:"email not sent"})
            console.log(err)
        }else{
            res.status(200).json({msg:"Email sent"})
        }
      })

  } catch (err) {
      // Handle errors
      console.error('Error occurred while fetching data', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { getPackagePayment,hotelcheckout,hotelpaymentVerification,getHotelPayment,paymentEmail };

