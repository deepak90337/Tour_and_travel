import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingComponent = () => {
  const [selectedDestination, setSelectedDestination] = useState("select");
  const [selectedPackage, setSelectedPackage] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // const [flightNumber, setFlightNumber] = useState("");
  // const [arrivalTime, setArrivalTime] = useState("");
  // const [departureTime, setDepartureTime] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date1: "",
    flight: "",
    atime: "",
    dtime: "",
    selectedDestination: "",
    price: "",
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    datetime: "",
    selectedDestination: "",
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     navigateToPayment();
  //   }
  // };

  const handleSubmit = async (e) => {
    // const newErrors = {};
    // setErrors(newErrors);
    const body = JSON.stringify({
      formData: formData,
      price: packagePrice,
    });
    e.preventDefault();
    if (validateForm()) {
      console.log("hello from register");
    }

    try {
      const response = await fetch("http://localhost:5000/api/addbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
        // body: JSON.stringify(formData,packagePrice)
      });

      if (response.status === 200) {
        console.log("Booking successful");
        setShowSuccess(true);
        setTimeout(() => {
          navigateToPayment();
        }, 1000);
      } else {
        setShowAlert(true);
        console.error("Booking failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  // const handleInputChange = (e) => {
  //   const { id, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [id]: value,
  //   }));
  //   validateForm(id, value);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //console.log(formData);

  // const handleFlightInputChange = (field, value) => {
  //   if (field === "flightNumber") {
  //     setFlightNumber(value);
  //   } else if (field === "arrivalTime") {
  //     setArrivalTime(value);
  //   } else if (field === "departureTime") {
  //     setDepartureTime(value);
  //   }
  // };

  const navigateToPayment = () => {
    const { name, email, date1, flight, atime, dtime } = formData;

    // Build the search query string for the payment page
    const queryString = `?packageName=${encodeURIComponent(
      selectedPackage.name
    )}&packagePrice=${encodeURIComponent(
      selectedPackage.price
    )}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(
      email
    )}&datetime=${encodeURIComponent(date1)}&flightNumber=${encodeURIComponent(
      flight
    )}&arrivalTime=${encodeURIComponent(
      atime
    )}&departureTime=${encodeURIComponent(dtime)}`;

    // Navigate to the payment page with the query string
    navigate(`/payment${queryString}`);
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

    if (formData.selectedDestination.trim === "select") {
      newErrors.selectedDestination = "Please select a destination";
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
    const destination = searchParams.get("destination");
    setSelectedDestination(destination);

    // Set the selected package details based on the destination
    setSelectedPackage(getPackageDetails(destination));
  }, [location]);

  const getPackageDetails = (destination) => {
    switch (destination) {
      case "Ladakh":
        return {
          name: "Ladakh Package",
          price: "₹20,300.00",
        };
      case "TajMahal":
        return {
          name: "TajMahal Package",
          price: "₹11,300.00",
        };
      case "Uttarakhand":
        return {
          name: "Uttarakhand Package",
          price: "₹18,100.00",
        };
      case "Ooty":
        return {
          name: "Ooty Package",
          price: "₹12,300.00",
        };
      case "Sikkim":
        return {
          name: "Sikkim Package",
          price: "₹22,500.00",
        };
      case "Meghalaya":
        return {
          name: "Uttarakhand Package",
          price: "₹14,299.00",
        };
      case "Manali":
        return {
          name: "Manali Package",
          price: "₹30,199.00",
        };
      case "Kedarnath":
        return {
          name: "Kedarnath Package",
          price: "₹20,990.00",
        };
      default:
        return {};
    }
  };

  const packagePrice = selectedPackage.price;
  // const handlepackageprice = () => {
  //   setPrice(packagePrice);
  // }

  // const handlepackageprice = (e) => {

  //   handleFlightInputChange(
  //     "departureTime",
  //     e.target.value
  //   )
  //     //setPrice(e.target.value)
  // }

  //const [packageprice] = useState(packagePrice);
  //console.log(packagePrice);

  return (
    <>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="booking p-5">
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
                <h1 className="text-white mb-4">Book A Tour</h1>
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
                <form>
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
                          id="selectedDestination"
                          name="selectedDestination"
                          value={selectedDestination}
                          onChange={(e) => {
                            handleInputChange(e); // This handles the form data change
                            const newDestination = e.target.value;
                            setSelectedDestination(newDestination); // This changes the selected destination
                            setSelectedPackage(
                              getPackageDetails(newDestination)
                            ); // This updates the package details

                            // When selecting an option other than "--Select--", clear the error for selectedDestination
                            if (newDestination !== "select") {
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                selectedDestination: "",
                              }));
                            }
                          }}
                        >
                          <option value="select">--Select--</option>
                          <option value="Ladakh">Ladakh</option>
                          <option value="TajMahal">Taj Mahal</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="Ooty">Ooty</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Manali">Manali</option>
                          <option value="Kedarnath">Kedarnath</option>
                        </select>

                        {errors.selectedDestination && (
                          <div className="invalid-feedback">
                            {errors.selectedDestination}
                          </div>
                        )}
                        <label htmlFor="selectedDestination">Destination</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          name="flight"
                          type="text"
                          className={`form-control bg-transparent ${
                            errors.flightNumber ? "is-invalid" : ""
                          }`}
                          id="flightNumber"
                          placeholder="Flight Number"
                          value={formData.flight}
                          onChange={handleInputChange}
                        />
                        {errors.flightNumber && (
                          <div className="invalid-feedback">
                            {errors.flightNumber}
                          </div>
                        )}
                        <label htmlFor="flightNumber">Flight Number</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          name="atime"
                          type="time"
                          className="form-control bg-transparent"
                          id="arrivalTime"
                          placeholder="Arrival Time"
                          value={formData.atime}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="arrivalTime">Arrival Time</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          name="dtime"
                          type="time"
                          className="form-control bg-transparent"
                          id="departureTime"
                          placeholder="Departure Time"
                          value={formData.dtime}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="departureTime">Departure Time</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          name="price"
                          type="text"
                          className="form-control bg-transparent"
                          placeholder="Package Price"
                          id="packagePrice"
                          value={packagePrice}
                          onChange={handleInputChange}
                          //readOnly // This makes the input read-only
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
                        onClick={handleSubmit}
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
    </>
  );
};

export default BookingComponent;
