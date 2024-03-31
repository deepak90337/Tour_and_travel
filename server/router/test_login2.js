const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
//const sessionStorage = require('sessionStorage');
//const User = require('../model/userSchema');

const User = require('../model/adduserschema');
 
const express = require('express');


//const mongoose = require('../DB/conn'); // Import mongoose instance

const app = express();
app.use(bodyParser.json());

async function loginUser(req, res) {

 const { name, password } = req.body;
      
        try {
          if (!name || !password) {
            return res.status(400).json({ error: 'Name and password are required' });
          }
      
          const user = await User.findOne({ name });
          if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          console.log(req.body);
           if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }else{
            console.log("else part ran");
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '2h' });
      
          console.log(token);
        
          res.status(200).json({ message: 'Login successful' ,token,user});
          }
      
          
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
}


module.exports = {
  loginUser
};
