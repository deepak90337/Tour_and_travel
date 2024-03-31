const dotenv = require('dotenv');
// dotenv.config({ path: '../router/config.env' });
dotenv.config();
const db = process.env.DATABASE;
const mongoose = require('mongoose');
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB Atlas', error);
  });