import React, { useEffect, useState } from "react";
import AboutComponent from "../component/AboutComponent";
import BookingComponent from "../component/BookingComponent";
import PackageComponent from "../component/PackageComponent";
import ServiceComponent from "../component/ServiceComponent";
import ProcessComponent from "../component/ProcessComponent";
import DestinationComponent from "../component/DestinationComponent";
import { useAuth } from "../context/userAuthContext";
// import { useSelector } from "react-redux";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();
    // const   {hotelBookings}  = useSelector((state) => state.hotelbookings); 
    // const lastBookingId = hotelBookings.length > 0 ? hotelBookings[hotelBookings.length - 1]._id : null;
// Assuming your slice name is "hotelBookings"
  //  console.log(JSON.stringify(lastBookingId))
  useEffect(() => {
    // Simulate loading for 2 seconds, replace with your actual loading logic
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, );


  return (
    <>
    
      {loading ? (
        <div
          id="spinner"
          className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
        >
          <div
            className="spinner-border text-primary"
            style={{
              width: "3rem",
              height: "3rem",
            }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        
        <div className="container-fluid position-relative p-0">
          <div className="container-fluid bg-primary py-5 mb-5 hero-header">
            <div className="container py-5">
              <div className="row justify-content-center py-5">
                <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                  <h1 className="display-3 text-white mb-3 animated slideInDown">
                    Enjoy Your Vacation With Us
                  </h1>
                  <p className="fs-4 text-white mb-4 animated slideInDown">
                    Welcome to Our Destiny Tour Site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        {/* <h2>Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hotel</th>
            <th>Date</th> */}
            {/* Other booking details */}
          {/* </tr>
        </thead>
            <tbody> */}
            {/* {hotelBookings.length > 0 ? (
              hotelBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.hotel_name}</td>
                  <td>{booking.date1}</td>
                  {/* Display other booking details */}
                {/* </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No bookings found.</td>
              </tr>
            )} */}
          {/* </tbody>

      
      </table> */}
      <AboutComponent />

      <ServiceComponent />

      <DestinationComponent />

      <PackageComponent />

        {user && (<BookingComponent />)}
      

      <ProcessComponent />
    </>
  );
};

export default Home;
