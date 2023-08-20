// dbconfig.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const dbConnectionString = process.env.DATABASE;

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });

module.exports = mongoose;
