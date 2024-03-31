import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/userAuthContext";
//import { useCookies } from 'react-cookie';
//import Register from "../pages/Register";
//import Login from "../pages/Login";


const Header = () => {
  // const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  // const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  const navigate = useNavigate();
  const {logout} = useAuth();
  const userToken = localStorage.getItem('Jwt_token');
  const adminToken = localStorage.getItem('admin_token');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(()=>{
  
    try {
      const intervalId = setInterval(() => {
        const token = localStorage.getItem("Jwt_token");
        if (token && token !== '') {
          const decoded = jwtDecode(token);
          const expiresAt = decoded.exp * 1000;
          if (Date.now() > expiresAt) {
            localStorage.removeItem('Jwt_token');
            // setIsLoggedIn(false);
            clearInterval(intervalId); // Stop checking after logout
          }
        }
      }, 60000); // Check every minute
    
      return () => clearInterval(intervalId); 
    } catch (error) {
      console.log(error);
    }
  },[])

 const handleLogout = () => {
    // Remove the JWT token from localStorage when logging out
    logout();
    localStorage.removeItem("Jwt_token");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("LoggedUserEmail")
    localStorage.removeItem("LoggedUserName")
    //setIsLoggedIn(false);
    // Redirect the user to the login page or any other desired page
    navigate("/login");
  };
  const location = useLocation();

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  // const toggleLoginForm = () => {
  //   const token = localStorage.getItem('Jwt_token');
  //   if(token){
  //     navigate("/")
  //   }else {
  //     // User is not logged in, show the login form
  //     navigate('/login');
  //   }
  //   //console.log(cookieValue);
  //   // setIsLoginFormVisible(!isLoginFormVisible);
  // };
  const handleUserProfile = () => {
    navigate("/userpage");
  };

  const toggleRegisterForm = () => {
    navigate("/register");
    // setIsRegisterFormVisible(!isRegisterFormVisible);
  };
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  // Check if the current route is the "Register" page
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  const isPaymentPage = location.pathname === "/payment";

  // Render null if it's the "Register", "Login", or "Payment" page
  if (isRegisterPage || isLoginPage || isPaymentPage) {
    return null;
  }
  return (
    <>
      <div className="container-fluid bg-dark px-5 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: "45px" }}
            >
              <small className="me-3 text-light">
                <i className="fa fa-map-marker-alt me-2"></i>123 Street,
                Gujarat, India
              </small>
              <small className="me-3 text-light">
                <i className="fa fa-phone-alt me-2"></i>+91 34532 67890
              </small>
              <small className="text-light">
                <i className="fa fa-envelope-open me-2"></i>info@example.com
              </small>
            </div>
          </div>
          <div className="col-lg-4 text-center text-lg-end">
            <div
              className="d-inline-flex align-items-center"
              style={{ height: "45px" }}
            >
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-twitter fw-normal"></i>
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-facebook-f fw-normal"></i>
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-linkedin-in fw-normal"></i>
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                to=""
              >
                <i className="fab fa-instagram fw-normal"></i>
              </Link>
              <Link
                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle"
                to=""
              >
                <i className="fab fa-youtube fw-normal"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
          <Link to="/" className="navbar-brand p-0">
                <h1 className="text-primary m-0"><i className="fa fa-map-marker-alt me-3"></i>Destiny Tours</h1>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0">
             
                <Link
                  to="/"
                  className={`nav-item nav-link ${
                    isLinkActive("/") ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`nav-item nav-link ${
                    isLinkActive("/about") ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              
                  {/* start */}
                  {userToken || adminToken ? (
                      <div className="dropdown">
                      <label
                        className={`nav-item nav-link dropdown-toggle ${
                          isLinkActive("/loggedbooking") || isLinkActive("/viewHotelBookings")  ? "active" : ""
                        }`}
                        id="servicesDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                      >
                        Services
                      </label>
                      <ul  className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="servicesDropdown">
                        <li>
                          <Link to="/loggedbooking" className="dropdown-item"  onClick={() => setDropdownOpen(!isDropdownOpen)}>
                            View Package Booking
                          </Link>
                        </li>
                        <li>
                          <Link to="/viewHotelBookings" className="dropdown-item"  onClick={() => setDropdownOpen(!isDropdownOpen)}>
                            View Hotel Booking
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    // Show the simple service menu if the user is not logged in
                    <Link
                    to="/services"
                    className={`nav-item nav-link ${
                      isLinkActive("/services") ? "active" : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    Services
                  </Link>
                  )}
                    {/* end */}
                 
                <Link
                  to="/packages"
                  className={`nav-item nav-link ${
                    isLinkActive("/packages") ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  Packages
                </Link>
                <Link
                  to="/hotelpage"
                  className={`nav-item nav-link ${
                    isLinkActive("/hotelpage") ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                 Hotels
                </Link>
                <Link
                  to="/destination"
                  className={`nav-item nav-link ${
                    isLinkActive("/destination") ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  Destination
                </Link>

                {localStorage.getItem("Jwt_token") && (
                     <Link
                     to="/booking"
                     className={`nav-item nav-link ${
                       isLinkActive("/booking") ? "active" : ""
                     }`}
                     onClick={handleLinkClick}
                   >
                     Booking
                   </Link>
                )}
               
                <Link
                  to="/contact"
                  className={`nav-item nav-link ${
                    isLinkActive("/contact") ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              
              <div className="d-flex align-items-center">
                {/*<button
          className="btn btn-outline-primary rounded-pill py-2 px-4 me-3"
          onClick={toggleLoginForm}
        >
          Login
        </button> */}
        <div>
                  { userToken || adminToken ?  ( //21-01-2024
                    // Show the logout button if the user is logged in
                    <div>
                      <button
                        className="btn btn-outline-danger rounded-pill py-2 px-4 me-3"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                      <button
                        className="btn btn-primary rounded-pill py-2 px-4"
                        onClick={handleUserProfile}
                      >
                        Profile
                      </button>
                    </div>
                  ) : (
                    // Show the login button if the user is not logged in
                    <div>
                      <button
                        className="btn btn-outline-primary rounded-pill py-2 px-4 me-3"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Login
                      </button>
                      <button
                        className="btn btn-primary rounded-pill py-2 px-4"
                        onClick={toggleRegisterForm}
                      >
                        Register
                      </button>
                    </div>
                  )}
                  </div>
              </div>
              {/* {isLoginFormVisible && (
        <div className="login-form-overlay">
          <div className="login-form">
            <Login/>
            <button
              className="btn btn-outline-danger"
              onClick={toggleLoginForm}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
              {/* {isRegisterFormVisible && (
        <div className="login-form-overlay">
          <div className="login-form">
            <Register/>
            <button
              className="btn btn-outline-danger"
              onClick={toggleRegisterForm}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
        </div>
        </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
