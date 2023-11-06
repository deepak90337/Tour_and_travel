import React,{useState,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/Navbar';

export default function AddUser() {
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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


      async  function addUser(e) {
        e.preventDefault();
    
         // Trim the formData
    for (let key in formData) {
      if (typeof formData[key] === 'string') {
          formData[key] = formData[key].trim();
      }
  }
        try {
          const response = await fetch('http://localhost:5000/api/addUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.status === 200) {
            console.log('added successfully');
            setShowSuccess(true);
        setTimeout(() => {
          navigate('/user');
        }, 1000);
          } else {
            setShowAlert(true);
            console.log(formData);
            console.error('add user failed');
          }
        } catch (error) {
          console.error('An error occurred', error);
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
        <h1 className="text-primary mb-4">Add New User</h1>
      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show">
          <button
            type="button"
            className="btn-close "
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          ></button>  Adding User failed
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
                  Add successful
                </div>
              )}
        <div className="row">
          <div className="col-md-12 mb-3">
            <input
              type="text"
              name='name'
              className="form-control py-3"
              placeholder="Name"
            
              onChange={handleChange}
            />
          </div>
          </div>
          <div className='row'>
          <div className="col-md-12 mb-3">
            <input
              type="email"
              name='email'
              className="form-control py-3"
              placeholder="Email"
             
              onChange={handleChange}
            />
          </div>
          </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <input
              type="password"
              name='password'
              className="form-control py-3"
              placeholder="Password"
             
              onChange={handleChange}
            />
          
          </div>
          
          
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <input
              type="password"
              className="form-control py-3"
              name='cpassword'
              placeholder="Confirm Password"
             
              onChange={handleChange}
            />
            
          </div>
          <div className='row' >
          <div className="col-md-3 mx-auto">
        {/* <select value={newUserRole} onChange={handleRoleChange}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select> */}
      
             <Button variant="primary" className='btn btn-primary btn-lg py-3 col-md-12' onClick={addUser}>Add User</Button>
             </div>
     </div>
    </div>
    </div>
    </div>
    </div>
  </>
  )
}
