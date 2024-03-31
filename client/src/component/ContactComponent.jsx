import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const ContactComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [userName, setuserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  // const [isPackageBookingChecked, setIsPackageBookingChecked] = useState(false);
  // const [isHotelBookingChecked, setIsHotelBookingChecked] = useState(false);
  // const [isFlightBookingChecked, setIsFlightBookingChecked] = useState(false);

  // const getSelectedServices = () => {
  //   const services = [];
  //   if (isPackageBookingChecked) services.push('Package Booking');
  //   if (isHotelBookingChecked) services.push('Hotel Booking');
  //   if (isFlightBookingChecked) services.push('Flight Booking');
  //   return services.join(', ');
  // };

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
 
    if (!validateForm()) {
      alert("Check Again Form",errors);
      console.log(errors)
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/send-email', emailData)

      // console.log("edit profile.jsx line 42",res.data)
    if(response.status === 200){
      setShowAlert(true);
      alert('Form Submitted');
      navigate('/');}
      
    if(response.status === 400){
      
      alert("There was some problem")}
   
      console.log('Email sent successfully!');
      // Handle success (e.g., show success message to user)
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error (e.g., display error message)
    }

   
    console.log("email in contact page ",emailData)
  

    // Reset the form or perform any other necessary actions
  };
  const emailData = {
    userName,
    userEmail,
    subject,
    message,
    // service : getSelectedServices()
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validation logic for each field
    if (!emailData.subject) {
        newErrors.subject = 'Subject is required';
        isValid = false;
      }
  

    if (!emailData.userName) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!emailData.userEmail) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    
    if (!emailData.message) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
       
   
    // Similar validations for other fields...

    setErrors(newErrors);
    return isValid;
  };

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Contact Us
            </h6>
            <h1 className="mb-5">Contact For Any Query</h1>
          </div>
          <div className="row g-4 justify-content-center align-items-center">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h5>Get In Touch</h5>
              <p className="mb-4">
                Feel free to reach out to us if you have any questions.We look
                forward to hearing from you!Our team is here to assist you with
                any concerns you may have.
              </p>
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="fa fa-map-marker-alt text-white"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Office</h5>
                  <p className="mb-0">123 Street, Gujarat, India</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="fa fa-phone-alt text-white"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Mobile</h5>
                  <p className="mb-0">+91 34532 67890</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="fa fa-envelope-open text-white"></i>
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Email</h5>
                  <p className="mb-0">info@example.com</p>
                </div>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <form>
              {showAlert && (
        <div className="alert alert-success alert-dismissible fade show">
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          ></button>
          Your message has been sent successfully!
        </div>
      )}
              <p className="mb-4">
                  Your feedback is valuable to us.We value your privacy and
                  confidentiality.Let us know how we can help you.Thank you for
                  considering us as your service provider.
                </p>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name" onChange={(e)=>setuserName(e.target.value)}
                      />
                      <label htmlFor="name">Your Name</label>
                      {errors.name && <div className="invalid-input">{errors.name}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        onChange={(e)=>setuserEmail(e.target.value)}
                      />
                      <label htmlFor="email">Your Email</label>
                      {errors.email && <div className="invalid-input">{errors.email}</div>}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                        onChange={(e)=>setSubject(e.target.value)}
                      />
                      <label htmlFor="subject">Subject</label>
                      {errors.subject && <div className="invalid-input">{errors.subject}</div>}
                    </div>
                  </div>
                  <div className="col-12">
                    {/* Services  */}
                    {/* <div className="form-floating d-flex flex-wrap justify-content-between">
                    <br />
<div>    <label>
  <input type="checkbox" id="package-booking" checked={isPackageBookingChecked} 
          onChange={(e) => setIsPackageBookingChecked(e.target.checked)} 
          />
  Package Booking
</label></div>
                
<div><label>
  <input type="checkbox" id="hotel-booking" checked={isHotelBookingChecked} 
  onChange={(e) => setIsHotelBookingChecked(e.target.checked)} 
  />
  Hotel Booking
</label></div>

<div><label>
  <input type="checkbox" id="flight-booking" checked={isFlightBookingChecked} 
  onChange={(e) => setIsFlightBookingChecked(e.target.checked)} />
  Flight Booking
</label></div>



                    </div> */}
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: "100px" }}
                        onChange={(e)=>setMessage(e.target.value)}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                      {errors.message && <div className="invalid-input">{errors.message}</div>}
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit" onClick={handleFormSubmit}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactComponent;
