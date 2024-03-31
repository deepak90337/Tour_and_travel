import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import HotelDeleteModal from './utility/HotelDeleteModal';
import { useDispatch } from 'react-redux';
import { setSelectedHotelBooking } from '../redux/booking/hotelBookingSlice';
import { useNavigate } from 'react-router-dom';

function HotelViewComp() {
    const [hotelbookingDatar, setHotelBookingDatar] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [itemId, setItemId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  //  const email="anjana@gmail.com";
    // console.log("logged In user",user.email);

    // const navigate = useNavigate();
    // const handleCancelBooking = (bookingId) => {
    //   // Navigate to the other component, passing the booking ID as a prop
    //   // <DeleteBooking bookingId={bookingData} />
    //   navigate(`/delete-hotelbooking?bId=${bookingId}`, {
    //     state: {
    //       bookingId,
    //     },
    //   });
    // };

    const handleCancelBooking = (bookingId) => {
      setShowModal(true);
      setItemId(bookingId)
    };
    const handlePayBtn = (booking) =>{
      dispatch(setSelectedHotelBooking(booking))
      navigate('/hotel-payment')

    }

    const handleDeleteSuccess = (deletedId) => {
      // Update booking data after successful deletion
      setHotelBookingDatar(prevData => prevData.filter(booking => booking._id !== deletedId));
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setItemId(null); // Reset the ID when closing the modal
    
    };


    const renderResults = () => {
        if (hotelbookingDatar.length > 0) {
          return (
           <div>
            {hotelbookingDatar.map((booking) => (
              <tr key={booking._id} className='d-flex justify-content-around'>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.date1}</td>
                <td style={{width:"min-content"}}>{booking.hotel_name}</td>
                <td>{booking.hotel_type}</td>
               <td>{booking.no_of_guest}</td>
               <td>{booking.check_in}</td>
               <td>{booking.check_out}</td>
                <td>{booking.hotel_price}</td>
                {/* <th>
                  <Button variant="danger rounded-pill" onClick={() => handleCancelBooking(booking._id)}>Cancel</Button>
                  <HotelDeleteModal show={showModal} handleClose={handleCloseModal} id={itemId} onDeleteSuccess={handleDeleteSuccess}/>
                </th> */}
                <td>
              {/* Conditional button rendering based on isPaymentDone */}
              {booking?.isPaymentDone ? (
                <div><Button variant="danger rounded-pill" onClick={() => handleCancelBooking(booking._id)}>Cancel</Button>
                <HotelDeleteModal show={showModal} handleClose={handleCloseModal} id={itemId} onDeleteSuccess={handleDeleteSuccess}/></div>
                ) : (
                  <Button variant="success rounded-pill" onClick={() => handlePayBtn(booking)}>
                    Pay Now
                  </Button>
                )}
            </td>
              </tr>
            ))}
          </div>
          );
        } else {
         
          return <p>No results found</p>;
        }
      };

      const token = localStorage.getItem('Jwt_token');




useEffect(()=>{
  async function fetchData(){
    try {
      if(token){
      const body = JSON.stringify({
        token:token
       });
       setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/gethotelbookings`,{
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
    }, body }
    
      );
  
      // Check for successful response
      if (!response.ok) {
       alert("some problem");
      }
  
      const data = await response.json();
      setHotelBookingDatar(data);
  
  }  setIsLoading(false)
    } catch (error) {
      console.error(error);
      // Handle the error appropriately, e.g., display error message
    }
  }
  fetchData();
},[token])

  return (

    <div>
       <div className="container-fluid bg-primary py-5 mb-0 hero-header">
 </div>
              
      <div className='overflow-auto'>
              <Table style={{marginTop:20}} className='table' striped  hover >
              <thead className='d-flex justify-content-around'>
            <th className='text-black ms-4 ps-2'>Name</th>
            <th className='text-black ms-3 ps-5'>Email</th>
            <th className='text-black ms-4 ps-5'>Date Of booking</th>
            <th className='text-black ps-4 ms-2'>Hotel Name</th>
            <th className='text-black  ms-4 ps-3'>Hotel Type</th>
            <th className='text-black' >No. of guest</th>
            <th className='text-black pe-4'>check_in</th>
            <th className='text-black me-4 pe-3'>check_out</th>
            <th className='text-black me-3 pe-4'>Hotel Price</th>
            <th className='text-black me-5 pe-2'>Action</th>
           </thead>
           {/* //     name: "",
//     email: "",
//     date1: "",
//     hotel_name: hotel ||"",
//     hotel_type: "",
//     no_of_guest:"",
//    check_in: "",
//     check_out: "",
//     hotel_price: "", */}
                {isLoading ? (
        <p>Loading results...</p>
      ) :(renderResults())}
            {/* {renderResults()} */}
              </Table>
     </div>
</div>
  )
}

export default React.memo(HotelViewComp);
