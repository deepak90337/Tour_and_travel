import React from "react";
import { Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios'
import { useSelector } from "react-redux";
import { selectSelectedBooking } from "../redux/booking/hotelBookingSlice";

const HotelPaymentComp = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const selectedBooking = useSelector(selectSelectedBooking);
  const hid = selectedBooking?._id || "N/A";

  const hotelPrice = selectedBooking?.hotel_price || "N/A";
  const hotelName =  selectedBooking?.hotel_name || "N/A";
  const no_of_guest = selectedBooking?.no_of_guest || "N/A";
  const checkIn =  selectedBooking?.check_in || "N/A";
  const checkOut =  selectedBooking?.check_out || "N/A";
  const handleGoBack = () => {
    navigate(-1); // Equivalent to history.goBack()
  };
//   name:
//   email:
//   date1: 
//   hotel_name: 
//   hotel_type: 
//   no_of_guest:
//  check_in: 
//   check_out: 
//   hotel_price: 
const amountWithoutSymbol = hotelPrice.replace(/[^0-9.]/g, '');
// console.log("payment comp",hid);
  const checkOuthandler=async (amount)=>{
    const {data:{key}}=await axios.get("http://localhost:5000/api/getrazorkey")
    const {data:{order}}=await axios.post("http://localhost:5000/payments/hotel-checkout",{amount})
    console.log("payment comp.",order);
    const options={
      key,
      "amount":order.amount,
      "currency":"INR",
      "name":"DestinyTours",
     " description":"Payment",
      "receipt":"test1dsfcv4",
      "order_id":order.id,
      // callback_url:"http://localhost:5000/api/paymentverification",
      "handler": async (response)=>{

          const body = {
            ...response,
            email:localStorage.getItem("LoggedUserEmail"),
            h_id:hid
          }
       
           const validateResponse = await fetch("http://localhost:5000/payments/hotel-payment-verification",{
              method:"POST",
              body:JSON.stringify(body),
              headers:{
                "content-type":"application/json"
              }
            })
            const jsonRes = await validateResponse.json();
            console.log(jsonRes);

            if(validateResponse.status === 200){
              // const response = await axios.post('http://localhost:5000/api/send-email', emailData)
              const emailBody = {
                userName:localStorage.getItem("LoggedUserName"),
                userEmail:localStorage.getItem("LoggedUserEmail"),
                subject:"Payment Details",
                message:`Hotel Booking order_id=${jsonRes.razorpay_order_id}`
              }
              const emailRes = await fetch("http://localhost:5000/payments/payment-email",{
                method:"POST",
              body:JSON.stringify(emailBody),
              headers:{
                "content-type":"application/json"
              }
              })

              if(emailRes.status === 200){
              navigate(`/paymentsuccess?order_id=${jsonRes.razorpay_order_id}`)}
   
            }
      },
      "prefill":{
        "name":"abc",
        "email":"abc@gmail.com",
        "contact":"7990890337"
      },
      "notes":{
        "address":"razorpay official"
      },
      "theme":{
       "color":"#334967"
      }
    };
    const razor = new window.Razorpay(options);
      razor.open();
  }
  
  const handlePaymentConfirmation = (e) => {
    e.preventDefault();
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
        
      checkOuthandler(amountWithoutSymbol);
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
  
  

  return (
    <div className="container-fluid bg-primary py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row justify-content-center py-5">
          <div className="col-md-6 mx-auto">
            <h1 className="text-white mb-4">Payment Details</h1>
            
            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">Hotel Payment</li>
                                </ol>
                            </nav>
            <form onSubmit={handlePaymentConfirmation}>
              <div className="row g-3">
                <div className="col-md-12">
                  <div className="form-group">
                   

                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      placeholder="Payment Detail"
                      id="packageInfo"
                      value={`Price: ${hotelPrice}`}
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
                      value={`Package: ${hotelName}`}
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
                      value={`Guests: ${no_of_guest}`}
                      readOnly
                    />
                    <label htmlFor="packageInfo">No. of Guest</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      placeholder="Package Detail"
                      id="packageInfo"
                      value={`Time: ${checkIn}`}
                      readOnly
                    />
                    <label htmlFor="packageInfo">Check In</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control bg-transparent"
                      placeholder="Package Detail"
                      id="packageInfo"
                      value={`Time: ${checkOut}`}
                      readOnly
                    />
                    <label htmlFor="packageInfo">Check Out</label>
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

export default HotelPaymentComp;
