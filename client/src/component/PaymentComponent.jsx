import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

// Import the payment option images
import googlePayImage from "../payimg/google_pay_image.png";
import phonePeImage from "../payimg/phone_pe_image.png";
import paytmImage from "../payimg/paytm_image.png";
import debitCardImage from "../payimg/debit_card_image.png";

const PaymentComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to manage the selected payment option and visibility of debit card form
  const [selectedOption, setSelectedOption] = useState("Google Pay");
  
  // Function to handle the "Back" button click
  const handleGoBack = () => {
    navigate(-1); // Equivalent to history.goBack()
  };

  // Function to handle the change in payment options
  
  const searchParams = new URLSearchParams(location.search);
  const packageName = searchParams.get("packageName");
  const packagePrice = searchParams.get("packagePrice");
  const flightNumber = searchParams.get("flightNumber");
  const arrivalTime = searchParams.get("arrivalTime");
  const departureTime = searchParams.get("departureTime");
  
  const handlePaymentConfirmation = () => {
    Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to proceed with the payment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pay",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        // Payment confirmed
        Swal.fire({
          title: "Payment Successful",
          text: "Your payment has been processed successfully!",
          icon: "success",
        });
        // You can redirect to a success page or perform other actions here
      } else {
        // Payment canceled
        Swal.fire({
          title: "Payment Canceled",
          text: "Your payment has been canceled.",
          icon: "error",
        });
      }
    });
  };
  
  // Function to handle input change and update formData
  
  const [gpayFormData, setGpayFormData] = useState({
    upiId: "",
  });

  const [phonePeFormData, setPhonePeFormData] = useState({
    upiId: "",
  });

  const [paytmFormData, setPaytmFormData] = useState({
    upiId: "",
  });

  const [debitCardFormData, setDebitCardFormData] = useState({
    debitCardNumber: "",
    debitCardExpiryDate: "",
    debitCardCvv: "",
    debitCardholderName: "",
  });

  const [gpayErrors, setGpayErrors] = useState({
    upiId: "",
  });

  const [phonePeErrors, setPhonePeErrors] = useState({
    upiId: "",
  });

  const [paytmErrors, setPaytmErrors] = useState({
    upiId: "",
  });

  const [debitCardErrors, setDebitCardErrors] = useState({
    debitCardNumber: "",
    debitCardExpiryDate: "",
    debitCardCvv: "",
    debitCardholderName: "",
  });

  // Function to handle payment option change
  const handlePaymentOptionChange = (e) => {
    setSelectedOption(e.target.value);
    resetFormAndErrors();
  };

  // Function to reset form data and errors for each option
  const resetFormAndErrors = () => {
    setGpayFormData({ upiId: "" });
    setPhonePeFormData({ upiId: "" });
    setPaytmFormData({ upiId: "" });
    setDebitCardFormData({
      debitCardNumber: "",
      debitCardExpiryDate: "",
      debitCardCvv: "",
      debitCardholderName: "",
    });
    setGpayErrors({ upiId: "" });
    setPhonePeErrors({ upiId: "" });
    setPaytmErrors({ upiId: "" });
    setDebitCardErrors({
      debitCardNumber: "",
      debitCardExpiryDate: "",
      debitCardCvv: "",
      debitCardholderName: "",
    });
  };

  // Function to handle form submission

  // Function to validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (selectedOption === "Google Pay") {
      if (gpayFormData.upiId.trim() === "") {
        newErrors.upiId = "UPI Id is required";
        valid = false;
      } else if (!/\S+@\S+/.test(gpayFormData.upiId)) {
        newErrors.upiId = "Invalid UPI ID format";
        valid = false;
      }else {
        newErrors.upiId = "";
      }
      setGpayErrors(newErrors);
    }
     else if (selectedOption === "PhonePe") {
      if (phonePeFormData.upiId.trim() === "") {
        newErrors.upiId = "UPI Id is required";
        valid = false;
      } else if (!/\S+@\S+/.test(phonePeFormData.upiId)) {
        newErrors.upiId = "Invalid UPI ID format";
        valid = false;
      }else {
        newErrors.upiId = "";
      }
      setPhonePeErrors(newErrors);
    }
     else if (selectedOption === "Paytm") {
      if (paytmFormData.upiId.trim() === "") {
        newErrors.upiId = "Invalid UPI ID format";
        valid = false;
      } else if (!/\S+@\S+/.test(paytmFormData.upiId)) {
        newErrors.upiId = "Invalid Username format";
        valid = false;
      } else {
        newErrors.upiId = "";
      }
      setPaytmErrors(newErrors);
    }
     else if (selectedOption === "Debit Card") {
      if (debitCardFormData.debitCardNumber.trim() === "") {
        newErrors.debitCardNumber = "Debit Card Number is required";
        valid = false;
      } else {
        newErrors.debitCardNumber = "";
      }
      setDebitCardErrors(newErrors);
      if (debitCardFormData.debitCardExpiryDate.trim() === "") {
        newErrors.debitCardExpiryDate = "Debit Card Expiry Date is required";
        valid = false;
      } else {
        newErrors.debitCardExpiryDate = "";
      }
      setDebitCardErrors(newErrors);
      if (debitCardFormData.debitCardCvv.trim() === "") {
        newErrors.debitCardCvv = "Debit Card CVV Number is required";
        valid = false;
      } else {
        newErrors.debitCardCvv = "";
      }
      setDebitCardErrors(newErrors);
      if (debitCardFormData.debitCardholderName.trim() === "") {
        newErrors.debitCardholderName = "Debit Card holder Namer is required";
        valid = false;
      } else {
        newErrors.debitCardholderName = "";
      }
      setDebitCardErrors(newErrors);
    }
    

    return valid;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (selectedOption === "Google Pay") {
      setGpayFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else if (selectedOption === "PhonePe") {
      setPhonePeFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else if (selectedOption === "Paytm") {
      setPaytmFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else if (selectedOption === "Debit Card") {
      setDebitCardFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }

    validateForm(); // You don't need to pass id and value here
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields and perform registration logic
    if (validateForm()) {
      handlePaymentConfirmation();
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container-fluid bg-primary py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row justify-content-center py-5">
          <div className="col-md-6 mx-auto">
            <h1 className="text-white mb-4">Payment Details</h1>
            
            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">Payment</li>
                                </ol>
                            </nav>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="paymentOptions" className="text-white mb-3">
                      Select Payment Option:
                    </label>
                    <div className="d-flex align-items-center">
                      {/* Google Pay */}
                      <div className="form-check me-4">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="paymentOptions"
                          id="googlePay"
                          value="Google Pay"
                          checked={selectedOption === "Google Pay"}
                          onChange={handlePaymentOptionChange}
                        />
                        <label className="form-check-label" htmlFor="googlePay">
                          <img
                            src={googlePayImage}
                            alt="Google Pay"
                            className="img-fluid"
                          />
                        </label>
                        {selectedOption === "Google Pay" && (
                          <div className="col-md-12">
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control bg-transparent ${
                                  gpayErrors.upiId ? "is-invalid" : ""
                                }`}
                                placeholder="UPI ID"
                                id="upiId"
                                
                             value={gpayFormData.upiId}
                                onChange={handleInputChange}
                              />
                              {gpayErrors.upiId && (
                                <div className="invalid-feedback mb-4">{gpayErrors.upiId}</div>
                              )}
                              <label htmlFor="upiId">UPI ID</label>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* PhonePe */}
                      <div className="form-check me-4">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="paymentOptions"
                          id="phonePe"
                          value="PhonePe"
                          checked={selectedOption === "PhonePe"}
                          onChange={handlePaymentOptionChange}
                        />
                        <label className="form-check-label" htmlFor="phonePe">
                          <img
                            src={phonePeImage}
                            alt="PhonePe"
                            className="img-fluid"
                          />
                        </label>
                        {selectedOption === "PhonePe" && (
                          <div className="col-md-12">
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control bg-transparent ${
                                  phonePeErrors.upiId ? "is-invalid" : ""
                                }`}
                                placeholder="UPI ID"
                                id="upiId"
                                value={phonePeFormData.upiId}
                                onChange={handleInputChange}
                              />
                              {phonePeErrors.upiId && (
                                <div className="invalid-feedback mb-4">{phonePeErrors.upiId}</div>
                              )}
                              <label htmlFor="upiId">UPI ID</label>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Paytm */}
                      <div className="form-check me-4">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="paymentOptions"
                          id="paytm"
                          value="Paytm"
                          checked={selectedOption === "Paytm"}
                          onChange={handlePaymentOptionChange}
                        />
                        <label className="form-check-label" htmlFor="paytm">
                          <img
                            src={paytmImage}
                            alt="Paytm"
                            className="img-fluid"
                          />
                        </label>
                        {selectedOption === "Paytm" && (
                          <div className="col-md-12">
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control bg-transparent ${
                                  paytmErrors.upiId ? "is-invalid" : ""
                                }`}
                                placeholder="UPI ID"
                                id="upiId"
                                value={paytmFormData.upiId}
                                onChange={handleInputChange}
                              />
                              {paytmErrors.upiId && (
                                <div className="invalid-feedback mb-4">{paytmErrors.upiId}</div>
                              )}
                              <label htmlFor="upiId">UPI ID</label>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Debit Card */}
                      
                      <div className="form-check me-4">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="paymentOptions"
                          id="debitCard"
                          value="Debit Card"
                          checked={selectedOption === "Debit Card"}
                          onChange={handlePaymentOptionChange}
                        />
                        <label className="form-check-label" htmlFor="debitCard">
                          <img
                            src={debitCardImage}
                            alt="Debit Card"
                            className="img-fluid"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {selectedOption === "Debit Card" && (
                    <>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className={`form-control bg-transparent ${
                            debitCardErrors.debitCardNumber ? "is-invalid" : ""
                          }`}
                          placeholder="Debit Card Number"
                          id="debitCardNumber"
                          value={debitCardFormData.debitCardNumber}
                          onChange={handleInputChange}
                        />
                        {debitCardErrors.debitCardNumber && (
                          <div className="invalid-feedback mb-4">{debitCardErrors.debitCardNumber}</div>
                        )}
                        <label htmlFor="debitCardNumber">
                          Debit Card Number
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className={`form-control bg-transparent ${
                            debitCardErrors.debitCardExpiryDate ? "is-invalid" : ""
                          }`}
                          id="debitCardExpiryDate"
                          placeholder="Expiry Date (MM/YY)"
                          value={debitCardFormData.debitCardExpiryDate}
                          onChange={handleInputChange}
                        />
                        {debitCardErrors.debitCardExpiryDate && (
                          <div className="invalid-feedback mb-4">{debitCardErrors.debitCardExpiryDate}</div>
                        )}
                        <label htmlFor="debitCardExpiryDate">
                          Expiry Date (MM/YY)
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className={`form-control bg-transparent ${
                            debitCardErrors.debitCardCvv ? "is-invalid" : ""
                          }`}
                          id="debitCardCvv"
                          placeholder="CVV"
                          value={debitCardFormData.debitCardCvv}
                          onChange={handleInputChange}
                        />
                        {debitCardErrors.debitCardCvv && (
                          <div className="invalid-feedback mb-4">{debitCardErrors.debitCardCvv}</div>
                        )}
                        <label htmlFor="debitCardCvv">CVV</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className={`form-control bg-transparent ${
                            debitCardErrors.debitCardholderName ? "is-invalid" : ""
                          }`}
                          placeholder="Cardholder Name"
                          id="debitCardholderName"
                          value={debitCardFormData.debitCardholderName}
                          onChange={handleInputChange}
                        />
                        {debitCardErrors.debitCardholderName && (
                          <div className="invalid-feedback mb-4">{debitCardErrors.debitCardholderName}</div>
                        )}
                        <label htmlFor="debitCardholderName">
                          Cardholder Name
                        </label>
                      </div>
                    </div>
                    </>
                    )}

                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      placeholder="Payment Detail"
                      id="packageInfo"
                      value={`Price: ${packagePrice}`}
                      readOnly // This makes the input read-only
                    />
                    <label htmlFor="paymentDetail">Payment Detail</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      placeholder="Package Detail"
                      id="packageInfo"
                      value={`Package: ${packageName}`}
                      readOnly
                    />
                    <label htmlFor="packageInfo">Package Detail</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      placeholder="Package Detail"
                      id="packageInfo"
                      value={`Flight: ${flightNumber}`}
                      readOnly
                    />
                    <label htmlFor="packageInfo">Flight Number</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      placeholder="Package Detail"
                      id="packageInfo"
                      value={`Time: ${arrivalTime}`}
                      readOnly
                    />
                    <label htmlFor="packageInfo">Arrival Time</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      placeholder="Package Detail"
                      id="packageInfo"
                      value={`Time: ${departureTime}`}
                      readOnly
                    />
                    <label htmlFor="packageInfo">Departure Time</label>
                  </div>
                </div>
                <div className="col-md-9 mx-auto">
                  <button
                    className="btn btn-outline-light w-100 py-3 mx-auto"
                    type="submit" // Change the button type to "button"
                    
                  >
                    Pay Now
                  </button>
                </div>            
              </div>
            </form>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <div className="text-center mt-3">
                  <button className="btn btn-outline-danger" onClick={handleGoBack}>
                    <i className="fas fa-arrow-left me-2"></i>Back
                  </button>
                </div>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
