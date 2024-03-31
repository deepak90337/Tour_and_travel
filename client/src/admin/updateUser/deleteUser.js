//import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/Navbar';

const Deleteuser = () => {
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   id: '',
  // });
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userId, setUserId] = useState(
    new URLSearchParams(window.location.search).get("user")
  );

  const handleIdChange = (event) => {
    setUserId(event.target.value);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };


  const handleDelete = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      useridn:userId
    
    });
    try {
      const response = await fetch('http://localhost:5000/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body
      });

      if (response.status === 200) {
        console.log('Delete successful');
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }else if(response.status === 400){ setShowAlert(true);} 
      else {
        setShowAlert(true);
        console.error('Delete failed');
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
        <h1 className="text-primary mb-4">Delete User</h1>
      <form>
      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show">
          <button
            type="button"
            className="btn-close "
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          ></button> delete failed
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
                  Delete successful
                </div>
              )}

        <div className="row">
          <div className="col-md-12 mb-3">
  <input type="text" name="useridn" className="form-control py-3" value={userId} onChange={handleIdChange} placeholder="User ID" />
  </div>
  </div>
  <div className="col-md-3 mx-auto">
  <button onClick={handleDelete} className="btn btn-danger btn-lg py-3 col-md-12">Delete User</button>
  </div>
</form>
</div>
    </div>
    </div>
    </>
  )
}

export default Deleteuser;
