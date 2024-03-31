import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import DeleteBooking from './DeleteBooking';

export default function Bookinglist() {
    const [email, setEmail] = useState('');
    const [bookingData,setBooking] = useState([]);
    // const [bookingDatar, setBookingDatar] = useState([]);

 
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    
    };
    const navigate = useNavigate();
    const handleCancelBooking = (bookingId) => {
      // Navigate to the other component, passing the booking ID as a prop
      // <DeleteBooking bookingId={bookingData} />
      navigate(`/delete-booking?bId=${bookingId}`, {
        state: {
          bookingId,
        },
      });
    };
    // console.log("booking list line 29", bookingDatar.tours[0].email);

     
    const handleSearch = async () => {
        const body = JSON.stringify({
            email:email
          });
        try{ const bookings = await fetch("http://localhost:5000/api/bookings",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body
        });
        const bookingsData = await bookings.json();
          setBooking(bookingsData);
          console.log(bookingData);
          console.log("data fetched : -",bookingsData);
        // Do something with the bookings data
    }catch (error) {
        console.error('Error fetching Bookings:', error);
    }};
    
    const renderResults = () => {
      if (bookingData.length > 0) {
        return (
          <ul>
          {bookingData.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.date1}</td>
              <td>{booking.selectedDestination}</td>
              <td>{booking.price}</td>
              <td>
                <Button variant="danger rounded-pill" onClick={() => handleCancelBooking(booking._id)}>Cancel</Button>
              </td>
            </tr>
          ))}
        </ul>
        );
      } else {
       
        return <p>No results found</p>;
      }
    };

      

  return (
    
    <div>
    <div className="container-fluid bg-primary py-5 mb-0 hero-header">
              
              </div>

        <table style={{marginTop:250}} className="table striped hover">
                
        <input type="email" value={email} onChange={handleEmailChange} />
       
       <button onClick={handleSearch}>Search</button>

       <thead>
       <tr>
        <td>Name</td>
        <td>Email</td>
        <td>Date Of booking</td>
        <td>Destination</td>
        <td>Price</td>
       </tr>
      
       </thead>
       {renderResults()}
   
 
            </table>
     
       
    </div>
  )
}
