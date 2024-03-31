import React, { useState, useEffect } from 'react';
 import Avatar from '../assets/userprofile.jpg'
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/userAuthContext';
import Swal from "sweetalert2";


const UserProfile= () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    image: 'assets/img/userprofile.jpg', // Add an image field to the profile object
  });
  // const {user}=useAuth();
  const navigate = useNavigate();

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
        navigate("/login");
      }
    });;
  };

 

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      // Only update the profile.image state if an image is selected
      setProfile((prevProfile) => ({
        ...prevProfile,
        image: URL.createObjectURL(selectedImage),
      }));
    }
  };

const handleEditProfile = () =>{
  navigate('/editProfile');
}

  useEffect(() => {const profileData = () => {
    const token = localStorage.getItem('Jwt_token');
   
   try {
     if (token) {
         const body = JSON.stringify({
             token:token
            });
       fetch('http://localhost:5000/api/profile', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
         }, body
       }).then(async (response) => {
         if (response.status === 401) {
           localStorage.removeItem("Jwt_token");
           navigate('/')
         } else {
           const data = await response.json();
           setProfile(data);
           localStorage.setItem("useremail",profile.email);
        
           localStorage.setItem("userProfilepic",profile.profilePic);
         }
       });
     }
   } catch (error) {
      console.log("Error ",error);
   }
  }
 
   profileData(); 
  },[profile.profilePic,profile.email,navigate]);
  
if(!profile){
  return showGreenAlert();
}

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-md-6 mx-auto">
      <div className="col-md-12">
      <div className="App">
  
    <div className="form-floating mb-3">
      {/* Display the profile image in a circular shape */}
      <div className="mb-3 text-center">
        {/* Create a clickable circular image */}
        <label htmlFor="profileImage" className="profile-image-label">
          <img
            className="profile-image"
            src={localStorage.getItem("userProfilepic") !== "http://localhost:5000/temp/undefined" ? localStorage.getItem("userProfilepic") : Avatar}
            alt='Pic Not Available'
          />
        </label>
        {/* Hidden file input for image selection */}
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
      <div>
        <div className='row'>
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
            <h5 className="card-title">Name: {profile.name}</h5>
            <p className="card-text">Email: {profile.email}</p>
          </div>
        </div>
      </div>
    </div>
</div>

      </div>
    </div>
    </div>
    </div>
  );
};

export default React.memo(UserProfile);
