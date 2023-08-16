const express = require("express");
const router = express.Router();

require("../model/conn2"); //14:48 mern stack thapa to review #9 user data in online database
const User = require("../model/userSchema");

router.get("/about", (req, res) => {
  res.send("Hello world express "); //routing
});

router
  .post("/register", (req, res) => {
    const { name, email, phone } = req.body; //destructing

    if (!name || !email || !phone) {
      return res.status(422).json({ error: "Please Enter in field" });
    }

    //console.log(name);   --method 1
    //console.log(req.body.name);  --method 2
    // console.log(req.body);

    // res.json({message:req.body});
    // res.send('This our registration page');

    user.findOne({ email: email }).then((userExist) => {
      if (userExist) {
        //user email in schema.js and email from website is matched
        return res.status(422).json({ error: "Email exist" });
      }
      const user = new User({ name, email, phone}); //key-value are same so we can write either key or value only
      User
        .save()
        .then(() => {
          res.status(201).json({ message: "Registered Successfully" });
        })
        .catch((err) =>
          res.status(500).json({ message: "Failed to registered bro" })
        );
      //const user = new User(req.body);//--it will get all fields name,password,etc
    }) .catch((err) => {
        console.log(err);
      }); //Using promises of javascript
  })
 
module.exports = router;
