const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Admin = require('../model/adminSchema');
 
const express = require('express');


//const mongoose = require('../DB/conn'); // Import mongoose instance

const app = express();
app.use(bodyParser.json());

async function loginAdmin(req, res) {

 const { name, password } = req.body;
      
        try {
          if (!name || !password) {
            return res.status(400).json({ error: 'Name and password are required' });
          }
      
          const admin = await Admin.findOne({ name });
          if (!Admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
      
          const isPasswordMatch = await bcrypt.compare(password, admin.password);
            
        
          console.log(req.body);
           if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }else{
            console.log("else part ran");
             const token = jwt.sign({ adminId: Admin._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      
             // sessionStorage.setItem("Jwt_token",token);
          res.cookie('Jwt_token', {
            expires: new Date(Date.now() + 2788678676),
            httpOnly: true,
            sameSite: 'lax', // Set the SameSite attribute to "Lax"
          });
          console.log("Admin token"+token);
        
          res.status(200).json({ message: 'Login successful'});
          }
      
          
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
}


module.exports = {
  loginAdmin
};
