import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function PaymentSuccessComp() {
  const [orderId, setOrderId] = useState(null);
    const navigate = useNavigate();
  // Get order ID from URL or redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdFromUrl = urlParams.get('order_id');

    if (orderIdFromUrl) {
      setOrderId(orderIdFromUrl);
    } else {
      // Handle the case where order ID is not found in URL (e.g., redirect to home)
    //  navigate('/')
    alert("no order ID")
    }
  }, [navigate]);


  // Show success modal only if order ID is present
  if (orderId) {
    
    Swal.fire({
      title: 'Payment Successful!',
      html: `Your payment for order : <strong>${orderId}</strong> has been <u>completed</u>. Note the order Id for Future Reference`,
      // text: `Your payment for order : ${orderId} has been completed. Note the order Id for Future Reference`,
      icon: 'success',
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Proceed To Home Page",
      backdrop: {
        background: 'rgba(44, 44, 44, 0.7)', // Semi-transparent black background
        // backdropClassName: 'my-custom-backdrop-class', // Optional CSS class for styling
      },
      allowOutsideClick: false, // Prevent closing by clicking outside
      // timer: 3000, // Optional: Automatically close modal after 3 seconds
    }).then((result)=>{
        if (result.isConfirmed) {
            navigate('/');
        }
    });
  }
  else{
    return <h1>No Order Placed</h1>
  }
}

export default PaymentSuccessComp;
