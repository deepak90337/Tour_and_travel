import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate,useLocation } from "react-router-dom";

const DeleteBooking = () => {
  const [bookingDeleted, setBookingDeleted] = useState(false);
  const location = useLocation();
 const navigate = useNavigate();

 
 const searchParams = new URLSearchParams(location.search);
 const bookingId = searchParams.get("bId");
  const handleDeleteBooking = async () => {
    // Delete the booking from the database
    const response = await fetch(`http://localhost:5000/api/deletebooking/${bookingId}`, {
      method: "DELETE",
    });
   
    if (response.status === 200) {
      setBookingDeleted(true);
      navigate('/bookinglist');
    } else {
      // Display an error message
    }
  };

  if (bookingDeleted) {
    return <p style={{marginTop:250}}>Booking deleted successfully.</p>;
  } else {
    return (
      <div>
        <p style={{marginTop:260}}>Are you sure you want to cancel this booking?</p>
        <Button style={{marginTop:270}} variant="danger" onClick={handleDeleteBooking}>Yes, cancel booking</Button>
      </div>
    );
  }
};

export default DeleteBooking;
