const express = require('express')
const Router = express.Router();
const {getHotels, searchHotels, addHotels, updateHotel, deleteHotel} = require('../controller/hotel.controller');


Router.post('/hotels-bookings',getHotels);
Router.post('/hotels-search',searchHotels);
Router.post('/hotels-add',addHotels);
Router.post('/hotels-update',updateHotel);
Router.post('/hotel-delete',deleteHotel);


module.exports = Router;