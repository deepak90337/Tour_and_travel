import React, { memo, useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SelectedPackageUpdate } from '../../redux/booking/packageBookingSlice';


const UpdatePackageForm = () => {
  const selectedBooking = useSelector(SelectedPackageUpdate);
  
  const [formData, setFormData] = useState({
 
    pId: selectedBooking?._id || 'N/A',
    name: selectedBooking?.name || 'N/A',
    email: selectedBooking?.email || 'N/A',
    date1: selectedBooking?.date1 || 'N/A',
    selectedDestination: selectedBooking?.selectedDestination || 'N/A',
    flight: selectedBooking?.flight || 'N/A',
    atime: selectedBooking?.atime || 'N/A',
    dtime: selectedBooking?.dtime || 'N/A',
    price: selectedBooking?.price || 'N/A',
  });

  const [selectedPackage, setSelectedPackage] = useState({});
  const [selectedDestination, setSelectedDestination] = useState("select");
  const navigate = useNavigate();
  const packagePrice = selectedPackage.price;
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   if (formData.price !== packagePrice) {
  //     setFormData({ ...formData, price: packagePrice });
  //   }
  // }, [packagePrice]); // Update formData when packagePrice changes
  useEffect(() => {
    setFormData(prevData => ({ ...prevData, price: packagePrice }));
  }, [packagePrice]);
  
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
  
    // Validation logic for each field
    if (!formData.pId) {
        newErrors.pId = 'Package Id is required';
        isValid = false;
      }

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
    
    if (!formData.selectedDestination) {
      newErrors.selectedDestination = 'Destination is required';
      isValid = false;
    }

    if (!formData.flight) {
      newErrors.flight = 'Flight No. is required';
      isValid = false;
    }

    if (!formData.atime) {
      newErrors.atime = 'Arrival Time is required';
      isValid = false;
    }

    if (!formData.dtime) {
      newErrors.dtime = 'Departure Time is required';
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
      const response = await axios.post('http://localhost:5000/packages/packages-update', formData);
  // console.log(response)
      if (response.status === 200) {
        console.log('Form submited successfully');
        alert('Form submitted successfully');
        navigate('/package-dashboard')
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
            <h3 style={{marginTop:20,marginBottom:20}}>Update Package Booking</h3>

            <Form.Group controlId="pId" style={{marginTop:20,marginBottom:20}}>
              <Form.Control
                type="text"
                placeholder="Enter Package Id"
                value={formData.pId}
                onChange={(e) => setFormData({ ...formData, pId: e.target.value })}
                isInvalid={!!errors.pId}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

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

            <Form.Group controlId="selectedDestination" style={{marginBottom:20}}>
            <Form.Select aria-label="Default select example"
            value={selectedDestination}
             onChange={(e) => {
              setFormData({ ...formData, selectedDestination: e.target.value})
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
            }}>
                <option value="select">--Select--</option>
                          <option value="Ladakh">Ladakh</option>
                          <option value="TajMahal">Taj Mahal</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="Ooty">Ooty</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Manali">Manali</option>
                          <option value="Kedarnath">Kedarnath</option>
            </Form.Select>
            </Form.Group>

            {/* // Name,email,date,destination,flight_Number,atime,dtime,package_price */}
            <Form.Group controlId="flight">
              <Form.Control
                type="text"
                placeholder="Flight No." 
                value={formData.flight}
                onChange={(e) => setFormData({ ...formData, flight: e.target.value })}
                isInvalid={!!errors.flight}
              />
              <Form.Control.Feedback type="invalid">{errors.flight}</Form.Control.Feedback>
            </Form.Group>

            <div className='pack_time_container'>
            <Form.Group controlId="atime">
            <Form.Label>Arrival Time</Form.Label>
              <Form.Control
                className='pack_time'
                type="time"
                placeholder="Arrival Time"
                value={formData.atime}
                onChange={(e) => setFormData({ ...formData, atime: e.target.value })}
                isInvalid={!!errors.atime}
              />
              <Form.Control.Feedback type="invalid">{errors.atime}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="dtime">
            <Form.Label>Departure Time</Form.Label>
              <Form.Control
                className='pack_time'
                type="time"
                placeholder="Departure Time"
                value={formData.dtime}
                onChange={(e) => setFormData({ ...formData, dtime: e.target.value })}
                isInvalid={!!errors.dtime}
              />
              <Form.Control.Feedback type="invalid">{errors.dtime}</Form.Control.Feedback>
            </Form.Group>
            </div>
            <Form.Group controlId="price" style={{marginBottom:20}}>
              <Form.Control
                type="text"
                placeholder="Package Price"
                value={formData.price}
                isInvalid={!!errors.price}
                readOnly
              />
              <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
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

export default memo(UpdatePackageForm);
