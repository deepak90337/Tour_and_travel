const express = require('express');
const { getPackagePayment, hotelcheckout, hotelpaymentVerification, getHotelPayment, paymentEmail } = require('../controller/payment.controller');
const Router = express.Router();


Router.post('/package-payments',getPackagePayment);
Router.post('/hotel-checkout',hotelcheckout);
Router.post('/hotel-payment-verification',hotelpaymentVerification);
Router.post('/hotel-payments',getHotelPayment);
Router.post('/payment-email',paymentEmail);


module.exports = Router;