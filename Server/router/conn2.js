const mongoose = require('mongoose');
require('dotenv').config({path:'./config.env'});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas', error);
    process.exit(1);
  }
};

module.exports = connectDB;
