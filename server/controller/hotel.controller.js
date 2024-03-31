const hotelb = require('../model/hotelbookingSchema')

const getHotels = async(req,res)=>{
    try {
        const hotels = await hotelb.find();
        res.json(hotels);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch packages' });
      }
}



const searchHotels = async(req,res)=>{
  try {
    const keyword = req.query.keyword;
  
    const hotels = await hotelb.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },  // Case-insensitive search
        { email: { $regex: keyword, $options: 'i' } },
        { hotel_name : { $regex: keyword, $options: 'i' }}
      ]
    });
    console.log("keyword in hotel cont.",hotels);
    res.json(hotels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search packages' });
  }
}

//Add packages by admin side
const addHotels = async(req,res)=>{
  
    const {
      name ,email , date1,hotel_name,hotel_type,
      no_of_guest,check_in,check_out,hotel_price
    } = req.body;
    
    console.log("add hotel controller",req.body);
    if ( name == '' ||email == '' || date1 == '' || hotel_name == '' ||
      hotel_type == '' || no_of_guest == '' || check_in == '' || check_out  == '' || hotel_price  == '') {
      return res.status(400).send({error:"Check the fields"});
    }
    try {
      const newhotel = await hotelb.create({
        name ,email , date1,hotel_name,hotel_type,
        no_of_guest,check_in,check_out,hotel_price
      });
  
      res.status(201).json(newhotel);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to Book hotel' });
    }  
}

   const updateHotel = async(req,res)=>{
    const {
     hId,name ,email , date1,hotel_name,hotel_type,
     no_of_guest,check_in,check_out,hotel_price
    } = req.body;
    console.log("update Hotel booking",req.body);

    if(  hId ==" " || name  ==" " || email  ==" " ||  date1,hotel_name ==" " || hotel_type ==" " || 
      no_of_guest ==" " || check_in ==" " || check_out ==" " || hotel_price == " "){
        return res.status(401).json({ error: 'Invalid input' });
      }
    try {
      const updateHotel = await hotelb.findByIdAndUpdate(hId, {
        name ,email , date1,hotel_name,hotel_type,
        no_of_guest,check_in,check_out,hotel_price
      }, { new: true });
  
      if (!updateHotel) {
        return res.status(404).json({ error: 'Package not found' });
      }
  
      res.status(200).json(updateHotel);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update package' });
    }
   }

   const deleteHotel = async(req,res)=>{
    const { hId } = req.body;

    if (!hId) {
      return res.status(400).json({ error: 'Hotel ID is required' });
    }
    // console.log("package id in delete package",hId);
    try {
      const deletedHotel = await hotelb.findByIdAndDelete(hId);
  
      if (!deletedHotel) {
        return res.status(404).json({ error: 'Hotel Booking not found' });
      }
  
      res.status(200).json({ message: 'Hotel Booking deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete Hotel Booking' });
    }
   }

module.exports = {getHotels,searchHotels,addHotels,updateHotel,deleteHotel};