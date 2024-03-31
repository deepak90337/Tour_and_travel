import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddHotelForm = () => {
  const [formData, setFormData] = useState({
    name:'',email:'' , date1:'',hotel_name:'',hotel_type:'',
    no_of_guest:'',check_in:'',check_out:'',hotel_price:'',
  });

    const navigate = useNavigate();
  // {/* name ,email , date1,hotel_name,hotel_type,
  // no_of_guest,check_in,check_out,hotel_price */}
  const [selectedHotel, setSelectedHotel] = useState({});
  const [errors, setErrors] = useState({});
  const hotelPrice = selectedHotel.price;

  useEffect(() => {
    if (formData.hotel_price !== hotelPrice) {
      setFormData({ ...formData, hotel_price: hotelPrice });
    }
  }, [hotelPrice,formData]); // Update formData when packagePrice changes
  const getHotelDetails = (hotel) => {
    switch (hotel) {
      case "Red Fox Hotel":
        return {
          name: "Red Fox Hotel",
          price: "₹20,300.00",
        };
      case "Blue Specific Hotel":
        return {
          name: "Blue Specific Hotel",
          price: "₹11,300.00",
        };
      case "Sunrise Hotel":
        return {
          name: "Sunrise Hotel",
          price: "₹18,100.00",
        };
      case "Blue Candle":
        return {
          name: "Blue Candle",
          price: "₹12,300.00",
        };
      case "Taj Hotel":
        return {
          name: "Taj Hotel",
          price: "₹22,500.00",
        };
      case "Hotel Prizo":
        return {
          name: "Hotel Prizo",
          price: "₹14,299.00",
        };
      case "Sapphire Hotel":
        return {
          name: "Sapphire Hotel",
          price: "₹30,199.00",
        };
      case "Hotel Moonrise":
        return {
          name: "Hotel Moonrise",
          price: "₹20,990.00",
        };
      default:
        return {};
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validation logic for each field
    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    
    if (!formData.date1) {
      newErrors.date1 = 'Date is required';
      isValid = false;
    }
       
    if (!formData.hotel_name) {
      newErrors.hotel_name = 'Hotel name is required';
      isValid = false;
    }

    if (!formData.hotel_type) {
      newErrors.hotel_type = 'Hotel type is required';
      isValid = false;
    }

    if (!formData.no_of_guest) {
      newErrors.no_of_guest = 'No. of Guest is required';
      isValid = false;
    }

    if (!formData.check_in) {
      newErrors.check_in = 'Check In Time is required';
      isValid = false;
    }

    if (!formData.check_out) {
      newErrors.check_out = 'Check out Time is required';
      isValid = false;
    }

    if (!formData.hotel_price) {
      newErrors.hotel_price = 'Price is required';
      isValid = false;
    }

    // Similar validations for other fields...

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      alert("Check Again Form");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/hotels/hotels-add', formData);
  
      if (response.status === 201) {
        console.log('Form submitted successfully');
        alert('Form submitted successfully');
        navigate('/hotel-dashboard')
      } else {
        // Handle other response codes (e.g., HTTP 400)
        console.error('Error submitting form:', response.statusText);
        alert('There was an error submitting the form');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error submitting form:', error.message);
      alert('There was an error submitting the form');
    }
  };
  

  return (
    
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <h3 style={{marginTop:20,marginBottom:20}}>Add Hotel Booking</h3>
            <Form.Group controlId="name" style={{marginTop:20,marginBottom:20}}>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            
            <div className='package_book_date'>
            <Form.Group controlId="date1">
              <Form.Label>Booking Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Package booking date"
                value={formData.date1}
                onChange={(e) => setFormData({ ...formData, date1: e.target.value })}
                isInvalid={!!errors.date1}
              />
              <Form.Control.Feedback type="invalid">{errors.date1}</Form.Control.Feedback>
            </Form.Group>
            </div>
         
            <Form.Group controlId="hotel_name" style={{marginBottom:20}}>
            <Form.Select aria-label="Default select example"
            id="selectedHotel"
            name="hotel_name"
            value={selectedHotel.name}
            onChange={(e) => {
              setFormData({ ...formData, hotel_name: e.target.value })
              const newHotel = e.target.value;
              setSelectedHotel(newHotel); // This changes the selected destination
             
              setSelectedHotel(
                getHotelDetails(newHotel)
              ); // This updates the package details
              // formData.price = selectedHotel.price;

              // When selecting an option other than "--Select--", clear the error for selectedDestination
              if (newHotel !== "select") {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  selectedHotel: "",
                }));
              }
            }}>
                    <option value="select">--Select Hotel--</option>
                          <option value="Red Fox Hotel">Red Fox Hotel</option>
                          <option value="Blue Specific Hotel">Blue Specific Hotel</option>
                          <option value="Sunrise Hotel">Sunrise Hotel</option>
                          <option value="Blue Candle">Blue Candle</option>
                          <option value="Taj Hotel">Taj Hotel</option>
                          <option value="Hotel Prizo">Hotel Prizo</option>
                          <option value="Sapphire Hotel">Sapphire Hotel</option>
                          <option value="Hotel Moonrise">Hotel Moonrise</option>
            </Form.Select>
            </Form.Group>

            
            <Form.Group controlId="hotel_type">
            <Form.Select aria-label="Default select example"
            id="selectedHotel"
            name="hotel_type"
            value={selectedHotel.hotel_type}
            onChange={(e) => {
              setFormData({ ...formData, hotel_type: e.target.value })
            }}>
                    <option value="select">--Select Hotel Type--</option>
                          <option value="AC">AC</option>
                          <option value="Non AC">NON AC</option>
            </Form.Select>
            </Form.Group>

 
           
            <Form.Group controlId="nguest">
              <Form.Control
                className='nguest'
                style={{marginTop:20}}
                type="number"
                placeholder="Number of Guest"
                value={formData.no_of_guest}
                onChange={(e) => setFormData({ ...formData, no_of_guest: e.target.value })}
                isInvalid={!!errors.no_of_guest}
                max={5}
                min={1}
              />
              <Form.Control.Feedback type="invalid">{errors.no_of_guest}</Form.Control.Feedback>
            </Form.Group>
            <div className='hotel_time_cont'>

            <Form.Group controlId="check_in" style={{marginTop:20}}>
            <Form.Label>Check-In Time</Form.Label>
              <Form.Control
                className='check_in'
                type="time"
                placeholder="Check-In Time"
                value={formData.check_in}
                onChange={(e) => setFormData({ ...formData, check_in: e.target.value })}
                isInvalid={!!errors.check_in}
              />
              <Form.Control.Feedback type="invalid">{errors.check_in}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="check_out" style={{marginTop:20}}>
            <Form.Label>Check-Out Time</Form.Label>
              <Form.Control
                className='check_out'
                type="time"
                placeholder="Check-out Time"
                value={formData.check_out}
                onChange={(e) => setFormData({ ...formData, check_out: e.target.value })}
                isInvalid={!!errors.check_out}
              />
              <Form.Control.Feedback type="invalid">{errors.check_out}</Form.Control.Feedback>
            </Form.Group>
            </div>
            <Form.Group controlId="hotel_price" style={{marginBottom:20,marginTop:20}}>
              <Form.Control
                type="string"
                placeholder="Hotel Price"
                value={formData.hotel_price}
                // onChange={(e) => setFormData({ ...formData, hotel_price: e.target.value })}
                isInvalid={!!errors.hotel_price}
                readOnly
              />
              <Form.Control.Feedback type="invalid">{errors.hotel_price}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddHotelForm;
