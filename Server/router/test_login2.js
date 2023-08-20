const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('../model/userSchema');
 
const express = require('express');


//const mongoose = require('../DB/conn'); // Import mongoose instance

const app = express();
app.use(bodyParser.json());

async function loginUser(req, res) {

 const { email, password } = req.body;
      
        try {
          if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
          }
      
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
      
          const isPasswordMatch = await bcrypt.compare(password, user.password);
      
          if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
      
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      
          res.cookie('Jwt_token', token, {
            expires: new Date(Date.now() + 2788678676),
            httpOnly: true,
            sameSite: 'lax', // Set the SameSite attribute to "Lax"
          });
          
          console.log(token);
          res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
}


module.exports = {
  loginUser
};
