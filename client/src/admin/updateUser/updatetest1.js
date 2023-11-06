import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Navbar from '../../component/Navbar';

const UserUpdate = () => {
  const [user, setUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
   //const location = useLocation();
  const navigate = useNavigate();
  // const searchParams = new URLSearchParams(location.search);
  // const userId = searchParams.get("user");
  // const userName = searchParams.get("username");
  // const userEmail = searchParams.get("useremail");

  const [userEmail, setUserEmail] = useState(
    new URLSearchParams(window.location.search).get("useremail")
  );
  const [userName, setUserName] = useState(
    new URLSearchParams(window.location.search).get("username")
  );
  const [userId, setUserId] = useState(
    new URLSearchParams(window.location.search).get("user")
  );
  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  }; 
 
  const handleIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userID = userId;
    const updatedUser = {
      ...user,
      ...Object.keys(event.target).filter((key) => key !== 'submit').map((name) => event.target[name].value)
    };
  
    try {
      await axios.post(`http://localhost:5000/api/test/${userID}`,updatedUser);
     // await axios.post(`/api/test/${user.id}`, updatedUser);
      setUser(updatedUser);
      setShowSuccess(true);
        setTimeout(() => {
          navigate('/user');
        }, 1000);
    } catch (error) {
      if (error.response.status === 400) {
        setShowAlert(true);
      }
      //setErrors(error.response.data.errors);
    }
  };
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds, replace with your actual loading logic
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

    return (
        <>

        {loading ? (
        <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style={{
    width: '3rem',
    height: '3rem',
  }} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
    ) : (
          <div className="container-fluid bg-primary py-5 mb-0 hero-header">
              
          </div>
    )}
     <Navbar/>
      
      
      
      <div className="container py-5">
        <div className="row justify-content-center">
        <div className="col-md-6 mx-auto">
        <h1 className="text-primary mb-4">Update User</h1>
        {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show">
          <button
            type="button"
            className="btn-close "
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          ></button> Update failed
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
                  Updated successful
                </div>
              )}
      <form onSubmit={handleSubmit}>
      <div className="row">
          <div className="col-md-12 mb-3">
  <input type="text" name="userID" value={userId} onChange={handleIdChange} class="form-control py-3" placeholder="User ID" />
  </div>
  </div>
  <div className="row">
          <div className="col-md-12 mb-3">
          <input type="text" name="username" value={userName} onChange={handleUserName} class="form-control py-3" placeholder="User Name" />
  </div>
  </div>
  <div className="row">
          <div className="col-md-12 mb-3">
  <input type="email" name="email" value={userEmail} onChange={handleEmailChange} class="form-control py-3" placeholder="Email" />
  </div>
  </div>
  <div className="row">
          <div className="col-md-12 mb-3">
  <input type="password" name="password" class="form-control py-3" placeholder="Password" />
  </div>
  </div>
  <div className="row">
          <div className="col-md-12 mb-3">
  <input type="password" name="cpassword" class="form-control py-3" placeholder="Confirm Password" />
  </div>
  </div>
  <div className='row' >
          <div className="col-md-4 mx-auto">
  <button type="submit" className='btn btn-primary btn-lg py-3 col-md-12'>Update user</button>
  </div>
  </div>
  
  </form>
      {/* {errors.map((error) => (
        <p key={error}>{error}</p>
      ))} */}
    </div>
    </div>
    </div>
    </>
  );
};

export default UserUpdate;
