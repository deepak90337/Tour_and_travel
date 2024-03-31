import React from "react";
import { useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const PackageComponent = () => {
const navigate = useNavigate();
// const location = useLocation();
// const searchParams = new URLSearchParams(location.search);
// const message = searchParams.get("m");
  const handleBookNow = (packageName) => {
    // Logic to navigate to the BookingComponent with the selected package name as a URL parameter
    // Replace '/booking' with the actual path to your BookingComponent route
    if(localStorage.getItem("Jwt_token")){
      window.location.href = `/booking?destination=${packageName}`;
    }else{
      // alert("Please login to do booking");
      Swal.fire({
        title: "Please login to book a package.",
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
              Packages
            </h6>
            <h1 className="mb-5">Awesome Packages</h1> 
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
                    src="assets/img/package-1.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    Ladakh
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
                  Experience the rugged charm of Ladakh, a land of stark landscapes and vibrant cultures.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Ladakh")} // Pass the destination name here
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
                    src="assets/img/package-2.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    Taj Mahal
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
                  Marvel at the timeless beauty of the Taj Mahal, a symbol of love and architectural excellence.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("TajMahal")} // Pass the destination name here
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
                    src="assets/img/package-3.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    Uttarakhand
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
                  Discover the natural wonders of Uttarakhand, where adventure and spirituality harmoniously coexist in the heart of the Himalayas.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Uttarakhand")} // Pass the destination name here
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
                    src="assets/img/package-4.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    Ooty
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
                  Lose yourself in the lush greenery and cool climate of Ooty, a paradise for nature lovers.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Ooty")} // Pass the destination name here
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
                    src="assets/img/package-5.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    Sikkim
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
                  Immerse yourself in the serene beauty of Sikkim, where tranquility meets breathtaking vistas at every turn.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Sikkim")} // Pass the destination name here
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
                    src="assets/img/package-6.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    Meghalaya
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
                  Embark on an enchanting journey through Meghalaya, where misty landscapes and living root bridges await your exploration.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Meghalaya")} // Pass the destination name here
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
                    src="assets/img/package-7.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    Manali
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
                  Escape to the pristine mountains of Manali, where snow-capped peaks and adventure beckon.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Manali")} // Pass the destination name here
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
                    src="assets/img/package-8.jpg"
                    alt=""
                  />
                </div>
                <div className="d-flex border-bottom">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    Kedarnath
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
                  Explore the majestic landscapes of Kedarnath, where every moment takes you closer to nature's heart.
                  </p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      className="btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "30px 30px 30px 30px" }}
                      onClick={() => handleBookNow("Kedarnath")} // Pass the destination name here
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
  );
};

export default PackageComponent;
