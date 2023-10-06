import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/register.jpg'

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5" style={{ maxHeight: '80vh' }}>
      <div className="card shadow p-4 d-flex flex-row"  style={{ maxWidth: '600px' }}>
        <div className="col-md-6">
          <h1 className="mb-4">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="name" className="small">Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="small">Email</label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="small">Phone</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="small">Password</label>
            <input
              type="password"
              className="form-control form-control-sm"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpassword" className="small">Confirm Password</label>
            <input
              type="password"
              className="form-control form-control-sm"
              id="cpassword"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
            />
            </div>
           <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Register
            </button>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={image1} alt="Registration" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
