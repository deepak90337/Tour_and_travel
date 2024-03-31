const express = require('express')
const Router = express.Router();
const {getPackages,searchPackages, addPackages, updatePackage, deletePackage}=require('../controller/packages.controller');


Router.post('/packages-bookings',getPackages);
Router.post('/packages-search',searchPackages);
Router.post('/packages-add',addPackages);
Router.post('/packages-update',updatePackage);
Router.post('/package-delete',deletePackage);


module.exports = Router;