// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function HotelDeleteModal({show, handleClose,id,onDeleteSuccess }) {
//   const [show, setShow] = useState(false);
// const [bookingDeleted, setBookingDeleted] = useState(false);

const navigate = useNavigate();

  // const handleClose = () =>{show=false}
//   const handleShow = () => setShow(true);

const bookingId = id;
  const handleDeleteBooking = async () => {
    // Delete the booking from the database
    const response = await fetch(`http://localhost:5000/api/deleteHotelbooking/${bookingId}`, {
        method: "DELETE",
      });
     
   
    if (response.status === 200) {
      // setBookingDeleted(true);
      onDeleteSuccess(id);
      handleClose();
      Swal.fire({
        title: 'Booking Cancelled!',
        icon: 'success',
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Proceed To View Bookings",
        backdrop: {
          background: 'rgba(44, 44, 44, 0.7)', // Semi-transparent black background
          // backdropClassName: 'my-custom-backdrop-class', // Optional CSS class for styling
        },
        allowOutsideClick: false, // Prevent closing by clicking outside
        // timer: 3000, // Optional: Automatically close modal after 3 seconds
      }).then((result)=>{
          if (result.isConfirmed) {
              navigate('/viewHotelBookings');
          }
      });
    } else {
      alert("something went wrong")
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        className='me-3'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to cancel booking?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteBooking()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HotelDeleteModal;