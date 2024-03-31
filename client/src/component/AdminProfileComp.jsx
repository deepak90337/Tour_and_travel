import React, { useState, useEffect } from 'react';
 import Avatar from '../assets/userprofile.jpg'
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/userAuthContext';
import Swal from 'sweetalert2';

const AdminProfile= () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    image: 'assets/img/userprofile.jpg', // Add an image field to the profile object
  });
  const navigate = useNavigate();
  // const {user}=useAuth();
 
const handleEditProfile = () =>{
  navigate('/edit-admin-Profile');
}
const showGreenAlert = () => {
  Swal.fire({
    title: 'Please log in to continue',
    text: 'Token Expired.',
    icon: 'info',
    confirmButtonColor: '#28a745',  // Green button color
    confirmButtonText: 'OK',
    // timer: 3000,  // Auto-close after 3 seconds
  }).then((result) => {
    if (result.isConfirmed) {
      // Navigate to the login page
      navigate("/adminlogin");
    }
  });;
};

  useEffect(() => {const profileData = () => {
    const token = localStorage.getItem('admin_token');
   
    if (token) {
        const body = JSON.stringify({
            token:token
           });
      fetch('http://localhost:5000/api/admin-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, body
      }).then(async (response) => {
        if (response.status === 401) {
          localStorage.removeItem("admin_token");
          navigate('/')
        } else {
          const data = await response.json();
          setProfile(data);
          localStorage.setItem("admin-email",profile.email);
          localStorage.setItem("admin-name",profile.name);
          localStorage.setItem("admin-pic",profile.profilePic);
        }
      });
    }
  }
//   const UserData = JSON.parse(localStorage.getItem('profile'));
// console.log(UserData.name);//works 1-10-2023


   profileData(); 
  },[profile.profilePic,profile.email,profile.name,navigate]);
  
  const adminpic = localStorage.getItem("admin-pic") ? 
  localStorage.getItem("admin-pic")!=="http://localhost:5000/temp/undefined" ? localStorage.getItem("admin-pic") :Avatar :Avatar

  if(!profile){
    showGreenAlert();
  }

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-6 mx-auto">
      <div className="col-md-12">
      <div className="form-floating mb-3">
          {/* Display the profile image in a circular shape */}
          <div className="mb-3 text-center">
            {/* Create a clickable circular image */}
            <label htmlFor="profileImage" className="profile-image-label">
               <img
                className="profile-image"
                src={adminpic}
                alt='Pic Not Available'/> </label>
          </div>
          <div>
          <div className='row' >
          <div className="col-md-4 mx-auto">
  <button type="submit" onClick={handleEditProfile} className='btn btn-primary btn-lg py-3 col-md-12'>Edit Profile</button>
  </div>
  </div>
          </div>
        </div>
        <div className="col-md-9 mx-auto">
        <div className="form-floating mb-3">
          <div className="card">
            <div className="card-body">
              {/* welcome {user?.name || "John"} */}
              <h5 className="card-title">Name: {profile.name}</h5>
              <p className="card-text">Email: {profile.email}</p>
                </div>
            </div>
          </div>
        </div>
          {/** Form End */}
      </div>
    </div>
    </div>
    </div>
  );
};

export default React.memo(AdminProfile);
