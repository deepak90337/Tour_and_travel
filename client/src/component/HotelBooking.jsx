import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function HotelBooking() {
  const navigate = useNavigate();

  const handleBookNow = (packageName) => {
    // Logic to navigate to the BookingComponent with the selected package name as a URL parameter
    // Replace '/booking' with the actual path to your BookingComponent route
    if(localStorage.getItem("Jwt_token")){
      window.location.href = `/hotelbooking?hotel=${packageName}`;
    }else{
      // alert("Please login to do booking");
      Swal.fire({
        title: "Please login to book a hotel.",
        text: "You must be logged in to book a package. Please click the button below to login.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#86B817",
        cancelButtonColor: "#86B817",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to the login page
          navigate("/login?m=Login to book a package");
        }
      });
          // navigate('/login?m=Login to book a package');
    } };
  return (
   <>
   <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
             Hotels
            </h6>
            <h1 className="mb-5">Available Hotels</h1> 
          </div>
          <div className="row g-4 justify-content-center">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="assets/Hotel_img/hotel_img1.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
              Red Fox Hotel
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2"></i>5
                    days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>2 Person
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">₹20,300.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <p>
                  Red Fox Hotel is a vibrant economy hotel chain in India that offers unbeatable value, safety, and service for price-conscious travelers
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Red Fox Hotel")} // Pass the destination name here
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    style={{minHeight:263}}
                    src="assets/Hotel_img/hotel_img2.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
              Blue Specific Hotel
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2"></i>3
                    days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>2 Person
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">₹11,300.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <p>
                  Blue Specific Hotel is a sophisticated upscale hotel known for its dynamic and unique experiences. 
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Blue Specific Hotel")} // Pass the destination name here
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="assets/Hotel_img/hotel_img3.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                  Sunrise Hotel
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2"></i>4
                    days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>2 Person
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">₹18,100.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <p>
                  Sunrise Hotel, located in Surat, Gujarat, is known for its excellent service and supportive staff
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Sunrise Hotel")} // Pass the destination name here
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="assets/Hotel_img/hotel_img4.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                 Blue Candle
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2"></i>3
                    days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>2 Person
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">₹12,300.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <p>
                  Blue Candle offers a unique blend of luxury and comfort, making it an ideal choice for both business and leisure travelers.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Blue Candle")} // Pass the destination name here
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    style={{height:263}}
                    src="assets/Hotel_img/hotel_img5.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                  Taj Hotel
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2"></i>8
                    days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>2 Person
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">₹22,500.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <p>
                  The Taj Mahal Palace, Mumbai, embodies opulent Indian heritage, offering unrivaled luxury with breathtaking sea views and legendary hospitality.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Taj Hotel")} // Pass the destination name here
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="assets/Hotel_img/hotel_img6.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                 Hotel Prizo
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2"></i>3
                    days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>2 Person
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">₹14,299.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <p>
                  Hotel Prizo is a new generation of centrally located lifestyle properties. It combines comfortable accommodation in an informal setting with a service culture
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Hotel Prizo")} // Pass the destination name here
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    style={{height:273}}
                    src="assets/Hotel_img/hotel_img9.jpeg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                  Sapphire Hotel
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2"></i>7
                    days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>2 Person
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">₹30,199.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <p>
           Sapphire Hotel is a luxury hotel chain offering memorable stays in various global destinations
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Sapphire Hotel")} // Pass the destination name here
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="package-item">
                <div className="overflow-hidden">
                  <img
                    className="img-fluid"
                    src="assets/Hotel_img/hotel_img8.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                  Hotel Moonrise
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-calendar-alt text-primary me-2"></i>3
                    days
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>2 Person
                  </small>
                </div>
                <div className="text-center p-4">
                  <h3 className="mb-0">₹20,990.00</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                    <small className="fa fa-star text-primary"></small>
                  </div>
                  <p>
                  Escape to tranquility at Hotel Moonrise, where moonlit views and cozy comfort await. Soak in the serene atmosphere and rediscover yourself under the glow of the sky.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Hotel Moonrise")} // Pass the destination name here
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default HotelBooking
