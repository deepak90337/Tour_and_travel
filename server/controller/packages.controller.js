const Booking = require("../model/bookingSchema");

const getPackages = async(req,res)=>{
    try {
        const packages = await Booking.find();
        res.json(packages);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch packages' });
      }
}

const searchPackages = async(req,res)=>{
  try {
    const keyword = req.query.keyword;

    const packages = await Booking.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },  // Case-insensitive search
        { email: { $regex: keyword, $options: 'i' } },
        { selectedDestination: { $regex: keyword, $options: 'i' } }
      ]
    });

    res.json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search packages' });
  }
}

//Add packages by admin side
const addPackages = async(req,res)=>{
  
    const {
      name,email,date1,selectedDestination,
      flight,atime,dtime,price,
    } = req.body;
    
    if ( name == '' ||email == '' || date1 == '' || selectedDestination == '' ||
      flight == '' || atime == '' || dtime == '' || price  == '') {
      return res.status(400).send({error:"Check the fields"});
    }
    try {
      const newPackage = await Booking.create({
      name,email,date1,selectedDestination,
      flight,atime,dtime,price,
      });
  
      res.status(201).json(newPackage);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create package' });
    }  
}

   const updatePackage = async(req,res)=>{
    const {
      pId, name, email,
      date1, selectedDestination,flight,
      atime,dtime,price,
    } = req.body;
    console.log("update packages",req.body);
    if(pId==" " ||  name==" " || email==" "||
      date1==" "|| selectedDestination==" "||flight==" "||
      atime==" "||dtime==" "||price==" "){
        return res.status(401).json({ error: 'invalid input' });
      }
    try {
      const updatedPackage = await Booking.findByIdAndUpdate(pId, {
        name, email,date1, 
        selectedDestination,flight,
        atime,dtime,price,
      }, { new: true });
  // console.log("package cont",updatePackage);
      if (!updatedPackage) {
        // console.log("packages cont. not found")
        return res.status(404).json({ error: 'Package not found' });
      }
  
      res.status(200).json(updatedPackage);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update package' });
    }
   }

   const deletePackage = async(req,res)=>{
    const { pId } = req.body;

    if (!pId) {
      return res.status(400).json({ error: 'Package ID is required' });
    }
    console.log("package id in delete package",pId);
    try {
      const deletedPackage = await Booking.findByIdAndDelete(pId);
  
      if (!deletedPackage) {
        return res.status(404).json({ error: 'Package not found' });
      }
  
      res.status(200).json({ message: 'Package deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete package' });
    }
   }

module.exports = {getPackages,searchPackages,addPackages,updatePackage,deletePackage};