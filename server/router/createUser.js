const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Useradd = require('../model/adduserschema');
const mongoose = require('../DB/conn'); 
const { loginUser } = require('./test_login2');
const { booking } = require('./bookingadd');
const {userProfile} = require('./userProfile');
const { Adminadd } = require('./addAdmin');
const {loginAdmin}=require('./adminLogin');
const {listBooking}=require('./listBooking');
const {deleteBooking} = require('./deleteBooking');
const app = express();



const port = 5000; // Use any port you prefer

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection setup
// User Schema
app.delete('/api/deletebooking/:bookingId', async (req, res) => {
  await deleteBooking(req, res); 
});

app.post('/api/bookings', async (req, res) => {
  await listBooking(req, res); 
});

app.post('/api/addAdmin', async (req, res) => {
  await Adminadd(req, res); 
});

app.post('/api/adminLogin', async (req, res) => {
  await loginAdmin(req, res); // Use the loginUser function from test-login.js
});


app.post('/api/profile', async (req, res) => {
  await userProfile(req, res); // Use the loginUser function from test-login.js
});

// Endpoint to get users
app.post('/api/login', async (req, res) => {
  await loginUser(req, res); // Use the loginUser function from test-login.js
});

app.post('/api/addbooking', async (req, res) => {
  await booking(req, res); // Use the loginUser function from test-login.js
});


app.get('/api/message', async (req, res) => {
  try {
    console.log("hello");
    res.json({ message: "Hello from the server!" });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching message' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await Useradd.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.post('/api/search', async (req, res) => {
  const {name} = req.body;
  console.log(name);
  try {//6-10-23    dooing incase search 
    const users = await Useradd.find({name : { $regex: name, $options: 'i' }});
    res.json(users);
    // console.log(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Endpoint to add a new user--without hash and it is fine 2-10-23
// app.post('/api/addUser', async (req, res) => {
//   const { name, email, password, cpassword } = req.body;

//   if (!/\S+@\S+\.\S+/.test(email)) {
//     return res.status(400).json({ error: 'Email is required' });
//   }
//   // Check if passwords match
//   if (password !== cpassword) {
//     return res.status(400).json({ error: 'Passwords do not match' });
//   }
//   const newUser = new Useradd({
//     name,
//     email,
//     password,
//     cpassword
  
//   });

//   try {
//     const savedUser = await newUser.save();
//     res.status(200).json(savedUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error adding user' });
//   }
// });

app.post('/api/addUser', async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Check if passwords match
  if (password !== cpassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    // Call the save() method to save the new user
    const savedUser = await new Useradd({
      name,
      email,
      password,
      cpassword,
    }).save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error adding user' });
  }
});


    app.post('/api/test/:userID', async (req, res) => {
      const userID = req.params.userID; // Access the user ID from the request body array
      const updatedData = {
        name: req.body[1],
        email: req.body[2],
       
        password: req.body[3],
        cpassword: req.body[4]
      };
    console.log(req.params);
      if (req.body[1] == '' || req.body[2] == "" || req.body[3] == "" || req.body[4] == "") {
        return res.status(400).json({message:"Update failed"});
     }

     if (req.body[3] !==  req.body[4] ) {
      return res.status(400).json({message:"Update failed"});
   }
      try {
        const updatedUser = await Useradd.findByIdAndUpdate(userID, updatedData, { new: true });
        res.json(updatedUser);
        console.log(req.body);
      } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
      }
    });
    
    app.post('/api/delete', async (req, res) => {
      //const { useridn } = req.body.useridn;
     console.log(req.body.useridn);
      // Check if passwords matc
      if (req.body.useridn == null) {
         return res.status(400).json({message:"delete failed"});
      }
      try {
        var id = req.body.useridn;
        //await Useradd.findByIdAndRemove(id);
        //await Useradd.deleteOne(useridn);
        await Useradd.findByIdAndDelete(id);
        res.status(200).json({ message: 'deleted user' });
      } catch (error) {
        res.status(500).json({ error: 'not deleted' });
      }
    });
    
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
