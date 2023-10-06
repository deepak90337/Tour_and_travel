import React, { useState,useEffect} from "react";
import { Link ,useNavigate } from "react-router-dom";
//import { useCookies } from 'react-cookie';
//import Cookies from "js-cookie";
//import { Alert } from "react-bootstrap";

const LoginComponent = () => {
//  const cookieValue = document.cookie.split().find(cookie => cookie.startsWith('Jwt_token'));
//console.log(cookieValue);

    const [showAlert, setShowAlert] = useState(false);
    const [showAlerts, setShowAlerts] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [cookieValue,setCookieValue] = useCookies('Jwt_token');
    const navigate = useNavigate();
   
    useEffect(() => {
      // Get the value of a specific cookie
     
      console.log('logincomponent');
      // You can then use the cookie value as needed in your component
      // For example, set it to a state variable or use it in some logic
    }, []);
  
   

    const [formData, setFormData] = useState({
      name: "",
      password: "",
    });
  
    const [errors, setErrors] = useState({
      name: "",
      password: "",
    });

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
            // Redirect to the home page here
            // navigate("/");
            window.scrollTo(0, 0);
          }
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
      const data = await response.json();
       const { token } = data;
       //const data1 = { key: 'value' };
       const expiration = new Date().getTime() + 24 * 3600 * 1000; // Set to expire in 1 hour (adjust as needed)
       localStorage.setItem('expiration', expiration );
       
       // Store the JWT token in localStorage or sessionStorage
       localStorage.setItem('Jwt_token', token);
        
        if (response.status === 200) {
          console.log('Login successful');
          setShowSuccess(true);
          setIsLoggedIn(true);
          //setCookieValue(response.token);
          console.log(response.token);
        setTimeout(() => {
          navigate('/');
          if (isLoggedIn) {
            navigate('/');
          }
        }, 2000);   
          // Redirect to home page on success
        } else if  (response.status === 401) {
          console.log('Invalid credentials');
          setShowAlert(true);
        }
        else if(response.status === 500){
          setShowAlerts(true);
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    };
  


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const validateForm = () => {
      let valid = true;
      const newErrors = {};
  
      if (formData.name.trim() === "") {
        newErrors.name = "Username is required";
        valid = false;}
      // } else if (!/\S+@\S+\.\S+/.test(formData.uname)) {
      //   newErrors.uname = "Invalid Username format";
      //   valid = false;
      // } 
      else {
        newErrors.name = "";
      }
  
      if (formData.password.trim() === "") {
        newErrors.password = "Password is required";
        valid = false;
      } else {
        newErrors.password = "";
      }
      setErrors(newErrors);
      return valid;
    };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
        <div className="col-md-6 mx-auto wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="text-primary text-center mb-8">Login</h1>
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row g-2 align-items-center">
          {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show">
          <button
            type="button"
            className="btn-close "
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          ></button>  Login failed
          </div>
        )}
         {showAlerts && (
        <div className="alert alert-danger alert-dismissible fade show">
          <button
            type="button"
            className="btn-close btn-danger"
            onClick={() => setShowAlerts(false)}
            aria-label="Close"
          ></button> server error
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
                  Login successful
                </div>
              )}
            <form onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control bg-transparent ${
                        errors.uname ? "is-invalid" : ""
                      }`}
                      id="name"
                      name="name"
                      placeholder="Username"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback mb-4">{errors.name}</div>
                    )}
                    <label htmlFor="uname">Username</label>
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
                <div className="col-md-8 mx-auto">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-lg"  type="submit" >
                    Login Now
                  </button>
                  <p className="text-center mt-3 mb-0">
                    Don't have an account yet?{" "}
                    <Link to={"/register"}>Register here</Link>
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

export default LoginComponent;
