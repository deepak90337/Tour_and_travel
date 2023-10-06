import React, { useState } from "react";
const ContactComponent = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform any form submission logic here

    // Show the alert
    setShowAlert(true);

    // Reset the form or perform any other necessary actions
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
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="message">Message</label>
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
