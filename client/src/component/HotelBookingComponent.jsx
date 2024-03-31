// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedHotelBooking } from '../redux/booking/hotelBookingSlice';

export default function HotelBookingComponent() {
    const dispatch = useDispatch();
    const [selectedHotel, setSelectedHotel] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const location = useLocation();
  const navigate = useNavigate();
    
   const uname = localStorage.getItem('LoggedUserName');
   const uemail = localStorage.getItem('LoggedUserEmail');
    const searchParams = new URLSearchParams(location.search);
    const hotel = searchParams.get("hotel");
  console.log("selected hotel",selectedHotel);

const [formData, setFormData] = useState({
    name: uname ||"",
    email: uemail ||"",
    date1: "",
    hotel_name: hotel ||"",
    hotel_type: "",
    no_of_guest:"",
   check_in: "",
    check_out: "",
    hotel_price: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const handleBookingRedirect = ()=>{
    navigate('/hotelBookingPayment')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (formData.name === "") {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

    if (formData.email === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (formData.datetime === "") {
      newErrors.datetime = "Date & Time is required";
      valid = false;
    } else {
      newErrors.datetime = "";
    }

    if (formData.hotel_type.trim === "select") {
      newErrors.hotel_type= "Please select a hotel";
      valid = false;
    }
    // if (flightNumber === "") {
    //   newErrors.flightNumber = "Flight number is required";
    //   valid = false;
    // }
    //  else {
    //   newErrors.flightNumber = "";
    // }

    // if (arrivalTime === "") {
    //   newErrors.arrivalTime = "Arrival time is required";
    //   valid = false;
    // } else {
    //   newErrors.arrivalTime = "";
    // }

    // if (departureTime === "") {
    //   newErrors.departureTime = "Departure time is required";
    //   valid = false;
    // } else {
    //   newErrors.departureTime = "";
    // }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    // Get the destination from the URL parameter
    const searchParams = new URLSearchParams(location.search);
    const hotel = searchParams.get("hotel");
    setSelectedHotel(hotel);

    // Set the selected package details based on the destination
    setSelectedHotel(getHotelDetails(hotel));
  }, [location]);

  const getHotelDetails = (hotel) => {
    switch (hotel) {
      case "Red Fox Hotel":
        return {
          name: "Red Fox Hotel",
          price: "₹20,300.00",
        };
      case "Blue Specific Hotel":
        return {
          name: "Blue Specific Hotel",
          price: "₹11,300.00",
        };
      case "Sunrise Hotel":
        return {
          name: "Sunrise Hotel",
          price: "₹18,100.00",
        };
      case "Blue Candle":
        return {
          name: "Blue Candle",
          price: "₹12,300.00",
        };
      case "Taj Hotel":
        return {
          name: "Taj Hotel",
          price: "₹22,500.00",
        };
      case "Hotel Prizo":
        return {
          name: "Hotel Prizo",
          price: "₹14,299.00",
        };
      case "Sapphire Hotel":
        return {
          name: "Sapphire Hotel",
          price: "₹30,199.00",
        };
      case "Hotel Moonrise":
        return {
          name: "Hotel Moonrise",
          price: "₹20,990.00",
        };
      default:
        return {};
    }
  };

  const hotelPrice = selectedHotel.price;
  console.log(hotelPrice);

const handleBooking = async (e) => {
  e.preventDefault();
  const body = JSON.stringify({
    formData: formData,
  });
  try{
    if (validateForm()) {
      console.log("hello from register");
    }
    const response = await fetch('http://localhost:5000/api/addhotelbooking', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      // body: JSON.stringify(formData,packagePrice)
    })
    const newBooking = await response.json();
    console.log(newBooking)
    dispatch(setSelectedHotelBooking(newBooking));
    // console.log("edit profile.jsx line 42",res.data)
    if (response.status === 200) {
      setShowAlert(false);
      setShowSuccess(true);
      // alert('Form Submitted');
      navigate('/hotel-payment');
    } else if (response.status === 400) {
      setShowAlert(true);
      // Handle Bad Request (status 400)
      console.log("Bad Request: ", response.data); // Log the specific error details
      alert("Bad Request: Please check your form data.");
    } else {
      // Handle other response statuses
      console.log("Hotelbooking line 181", response.status);
      alert("There was some problem");
    }
  
  }catch(error){
    console.log("Hotelbooking line 181",error)
  }}
   
  return (
    <div>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="hotelbooking p-5">
            <div className="row g-5 align-items-center">
              <div className="col-md-6 text-white">
                <h6 className="text-white text-uppercase">Booking</h6>

                <h1 className="text-white mb-4">Online Booking</h1>
                <p className="mb-4">
                  Explore our fantastic range of travel destinations and book
                  your dream vacation today.Experience the beauty of Thailand,
                  Indonesia, and Malaysia with our exclusive packages.Discover
                  the perfect blend of adventure and relaxation in our carefully
                  curated tours.
                </p>
                <p className="mb-4">
                  Let us know your special requests, and we'll make sure your
                  trip is unforgettable.Your satisfaction is our priority, and
                  we're committed to providing you with exceptional
                  service.Create lasting memories with our expertly crafted
                  travel experiences.
                </p>
                <p className="mb-4">
                  Immerse yourself in the culture and natural wonders of these
                  stunning destinations.Get ready for an unforgettable journey
                  with our hassle-free online booking system.Trust us to handle
                  all the details, so you can focus on making the most of your
                  vacation.
                </p>
              </div>
              <div className="col-md-6">
                <h1 className="text-white mb-4">Book A Hotel</h1>
                {showAlert && (
                  <div className="alert alert-danger alert-dismissible fade show">
                    <button
                      type="button"
                      className="btn-close "
                      onClick={() => setShowAlert(false)}
                      aria-label="Close"
                    ></button>{" "}
                    Booking failed
                  </div>
                )}
                {showSuccess && ( // Conditional rendering for success message
                  <div className="alert alert-success alert-dismissible fade show">
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowSuccess(false)}
                      aria-label="Close"
                    ></button>
                    Booking successful
                  </div>
                )}
                <form onSubmit={handleBookingRedirect}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          name="name"
                          type="text"
                          className={`form-control bg-transparent ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          id="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          readOnly
                        />
                          <label htmlFor="name" >Your Name</label>
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          name="email"
                          type="email"
                          className={`form-control bg-transparent ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          id="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          readOnly
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          name="date1"
                          type="date"
                          className={`form-control bg-transparent`}
                          id="date1"
                          placeholder="Date"
                          value={formData.date1}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="date1">Date</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select 
                         className={`form-select bg-transparent ${
                          errors.selectedDestination ? "is-invalid" : ""
                        }`}
                        id="selectedHotel"
                        name="hotel_name"
                        value={selectedHotel.name}
                        onChange={(e) => {
                          handleInputChange(e); // This handles the form data change
                          const newHotel = e.target.value;
                          setSelectedHotel(newHotel); // This changes the selected destination
                         
                          setSelectedHotel(
                            getHotelDetails(newHotel)
                          ); // This updates the package details
                          // formData.price = selectedHotel.price;

                          // When selecting an option other than "--Select--", clear the error for selectedDestination
                          if (newHotel !== "select") {
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              selectedHotel: "",
                            }));
                          }
                        }}>
                          <option value="select">--Select--</option>
                          <option value="Red Fox Hotel">Red Fox Hotel</option>
                          <option value="Blue Specific Hotel">Blue Specific Hotel</option>
                          <option value="Sunrise Hotel">Sunrise Hotel</option>
                          <option value="Blue Candle">Blue Candle</option>
                          <option value="Taj Hotel">Taj Hotel</option>
                          <option value="Hotel Prizo">Hotel Prizo</option>
                          <option value="Sapphire Hotel">Sapphire Hotel</option>
                          <option value="Hotel Moonrise">Hotel Moonrise</option>
                        </select>
                        <label htmlFor="selectedHotel">Hotel</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <select
                          name="hotel_type"
                          type="text"
                          className={`form-control bg-transparent ${
                            errors.flightNumber ? "is-invalid" : ""
                          }`}
                          id="hotel_type"
                          placeholder="Hotel Type"
                          value={formData.hotel_type}
                          onChange={handleInputChange}
                        ><option value="select">--Select--</option>
                           <option value="Non AC">Non AC</option>
                          <option value="AC">AC</option>
                        </select>
                        {errors.flightNumber && (
                          <div className="invalid-feedback">
                            {errors.flightNumber}
                          </div>
                        )}
                        <label htmlFor="hotel_type">Hotel Type</label>
                      </div>
                    </div>

                      <div className="col-12">
                      <div className="form-floating">
                        <input
                          name="no_of_guest"
                          type="number"
                          className={`form-control bg-transparent ${
                            errors.flightNumber ? "is-invalid" : ""
                          }`}
                          id="no_of_guest"
                          placeholder="Number of guest"
                          value={formData.no_of_guest}
                          onChange={handleInputChange}
                          max={5}
                          min={1}
                        />
                        {errors.flightNumber && (
                          <div className="invalid-feedback">
                            {errors.flightNumber}
                          </div>
                        )}
                        <label htmlFor="no_of_guest">Number of Guests</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          name="check_in"
                          type="time"
                          className="form-control bg-transparent"
                          id="arrivalTime"
                          placeholder="Arrival Time"
                          value={formData.atime}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="arrivalTime">Check-In Time</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          name="check_out"
                          type="time"
                          className="form-control bg-transparent"
                          id="departureTime"
                          placeholder="Departure Time"
                          value={formData.dtime}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="departureTime">Check-out Time</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          name="hotel_price"
                          type="text"
                          className="form-control bg-transparent"
                          placeholder="Package Price"
                          id="packagePrice"
                         value={hotelPrice}
                          // onChange={formData.hotel_price=hotelPrice}
                          onChange={formData.hotel_price=hotelPrice}
                          readOnly // This makes the input read-only
                        />
                        <label htmlFor="packagePrice">Package Price</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-outline-light w-100 py-3"
                        name="name"
                        type="submit"
                        value={formData.price}
                        onChange={handleInputChange}
                        onClick={handleBooking}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}

