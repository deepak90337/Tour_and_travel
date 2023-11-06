import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // Function to handle input change and update formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("from input change"+formData);
    //validateForm(id, value);
  };

  // Function to handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Validate form fields and perform registration logic
  //   if (validateForm()) {
  //     navigate("/");
  //     window.scrollTo(0, 0);
  //   }
  // };

  const handleSubmit = async (e) => {
    // const newErrors = {};
    // setErrors(newErrors);
    e.preventDefault();
    if (validateForm()) {
         console.log("hello from register");
        }

    try {
      const response = await fetch('http://localhost:5000/api/addAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Registration successful');
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/adminlogin');
        }, 1000);      
      } else {
        setShowAlert(true);
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };


  //Function to validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      newErrors.password = "";
    }

    if (formData.cpassword.trim() === "") {
      newErrors.cpassword = "Confirm Password is required";
      valid = false;
    } else if (formData.password !== formData.cpassword) {
      newErrors.cpassword = "Passwords do not match";
      valid = false;
    }
    else {
      newErrors.cpassword = "";
    }
    setErrors(newErrors);
     if (formData.password === formData.cpassword) {
      newErrors.cpassword = ""; 
       return valid = true;
    }
    return valid;
  };

  return (
    <>
    <div className="container-fluid bg-primary py-5 mb-0 hero-header">
              
              </div>
      <div className="container py-5">
        <div className="row justify-content-center">
        <div className="col-md-6 mx-auto wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="text-primary text-center mb-8">Admin Register</h1>
         {/* {showAlerts && (
        <div className="alert alert-success alert-dismissible fade show">
          <button
            type="button"
            className="btn-close btn-danger"
            onClick={() => setShowAlerts(false)}
            aria-label="Close"
          ></button> server error
          </div>
        )} */}
          
      <div className="container-xxl py-4 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row g-2 align-items-center">
          {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show">
          <button
            type="button"
            className="btn-close "
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          ></button>  Registration failed
          </div>
        )}
        {showSuccess && ( // Conditional rendering for success message
                <div className="alert alert-success alert-dismissible fade show">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowSuccess(false)}
                    aria-label="Close"
                  ></button>
                  Registration successful
                </div>
              )}
            <form onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control bg-transparent `}
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback mb-4">{errors.name}</div>
                    )}

                    <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control bg-transparent ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      placeholder="Your Email "
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback mb-4">{errors.email}</div>
                    )}

                    <label htmlFor="email">Your Email </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={`form-control bg-transparent ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback mb-4">{errors.password}</div>
                    )}

                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={`form-control bg-transparent ${
                        errors.cpassword ? "is-invalid" : ""
                      }`}
                      placeholder="Confirm Password"
                      id="cpassword"
                      name="cpassword"
                      value={formData.cpassword}
                      onChange={handleInputChange}
                    />
                    {errors.cpassword && (
                      <div className="invalid-feedback mb-4">{errors.cpassword}</div>
                    )}

                    <label htmlFor="cpassword">Confirm Password</label>
                  </div>
                </div>
                <div className="col-md-8 mx-auto">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Register Now
                  </button>
                  <p className="text-center mt-3 mb-0" >
                    Already have an account?{" "}
                    <Link to={"/adminlogin"}>Login here</Link>
                  </p>
                  <p className="text-center mt-1 mb-0">OR</p>
                  <p className="text-center mt-1 mb-0" >Go to the <Link to="/">Home Page</Link></p>
                </div>    
                </div>    
            </form>
          </div>
        </div>
      </div>
      </div>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
