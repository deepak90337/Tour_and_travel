import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate,useLocation } from "react-router-dom";

const DeleteHotelBooking = () => {
  const [hotelbookingDeleted, sethotelBookingDeleted] = useState(false);
  const location = useLocation();
 const navigate = useNavigate();

 
 const searchParams = new URLSearchParams(location.search);
 const bookingId = searchParams.get("bId");
  const handleDeleteBooking = async () => {
    // Delete the booking from the database
    const response = await fetch(`http://localhost:5000/api/deleteHotelbooking/${bookingId}`, {
      method: "DELETE",
    });
   
    if (response.status === 200) {
      sethotelBookingDeleted(true);
      navigate('/viewHotelBookings');
    } else {
      // Display an error message
      alert("Delete Failed")
    }
  };

  if (hotelbookingDeleted) {
    return <p style={{marginTop:250}}>Booking deleted successfully.</p>;
  } else {
    return (
      <div>
        <div className="container-fluid bg-primary py-5 mb-0 hero-header">
              
              </div>
        <p style={{marginTop:260}}>Are you sure you want to cancel this booking?</p>
        <Button style={{marginTop:270}} variant="danger" onClick={handleDeleteBooking}>Yes, cancel booking</Button>
      </div>
    );
  }
};

export default DeleteHotelBooking;
