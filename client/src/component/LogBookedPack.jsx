import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import Table from 'react-bootstrap/Table';
import Deletemodal from './utility/modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedBooking } from '../redux/booking/packageBookingSlice';


function LogBookedPack() {
    const [bookingDatar, setBookingDatar] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [itemId, setItemId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  //  const email="anjana@gmail.com";
    // console.log("logged In user",user.email);

    // const navigate = useNavigate();
    const handleCancelBooking = (bookingId) => {
      setShowModal(true);
      setItemId(bookingId)
    };

    const handlePayBtn = (booking) =>{
      dispatch(setSelectedBooking(booking))
      navigate('/payment')

    }

    const handleDeleteSuccess = (deletedId) => {
      // Update booking data after successful deletion
      setBookingDatar(prevData => prevData.filter(booking => booking._id !== deletedId));
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setItemId(null); // Reset the ID when closing the modal
    
    };

    const renderResults = () => {
        if (bookingDatar.length > 0) {
          return (
           <tbody>
            {bookingDatar.map((booking) => (
              <tr key={booking._id} className='d-flex justify-content-around'>
                <td>{booking.name}</td>
                <td>{booking.date1}</td>
                <td>{booking.selectedDestination}</td>
                <td>{booking.email}</td>
                <td>{booking.price}</td>
                {/* <td>
                  <Button variant="danger rounded-pill" onClick={() => handleCancelBooking(booking._id)}>Cancel</Button>
                  <Deletemodal show={showModal} handleClose={handleCloseModal} id={itemId} onDeleteSuccess={handleDeleteSuccess}/>
                </td> */}
                <td>
              {/* Conditional button rendering based on isPaymentDone */}
              {booking?.isPaymentDone ? (
                <div><Button variant="danger rounded-pill" onClick={() => handleCancelBooking(booking._id)}>Cancel</Button>
                <Deletemodal show={showModal} handleClose={handleCloseModal} id={itemId} onDeleteSuccess={handleDeleteSuccess}/></div>
                ) : (
                  <Button variant="success rounded-pill" onClick={() => handlePayBtn(booking)}>
                    Pay Now
                  </Button>
                )}
            </td>
              </tr>
            ))}
          </tbody>
          );
        } else {
         
          return <tbody><tr><td>No records</td></tr></tbody>;
        }
      };

      const token = localStorage.getItem('Jwt_token');



useEffect(()=>{
  async function fetchData(){
    setIsLoading(true)
    try {
      if(token){
      const body = JSON.stringify({
        token:token
       });
      const response = await fetch(`http://localhost:5000/showbooking`,{
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
    }, body }
    
      );
  // console.log(response)
      // if(response.ok){
      //   navigate('/loggedbooking')
      // }
      // Check for successful response
      if (!response.ok) {
       alert("some problem");
      }
      if (response.status === 401) {
        alert("some problem");
        navigate("/");
       }
      const data = await response.json();
      setBookingDatar(data);}
      setIsLoading(false)
    } catch (error) {
      console.error(error);
      // Handle the error appropriately, e.g., display error message
    }
  }
fetchData();  
},[token,navigate])

  return (

    <div>
       <div className="container-fluid bg-primary py-5 mb-0 hero-header">
 </div>
              
      <div className='overflow-auto'>
              <table style={{marginTop:20}}  className='table overflow-auto'>
            <thead className='d-flex justify-content-around'>
             <th className='text-black ps-2'>Name</th>
             <th  className='text-black ps-2'>Date Of booking</th>
             <th  className='text-black pe-5'>Destination</th>
             <th  className='text-black me-3 pe-5'>Email</th>
            <th className='text-black me-3 pe-5'>Price</th>
            <th  className='text-black pe-3'>Action</th>
           </thead>
            {isLoading ? (
        <p>Loading results...</p>
      ) :(renderResults())}
              </table>
     </div>
</div>
  )
}

export default LogBookedPack
