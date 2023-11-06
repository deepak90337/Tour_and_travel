import React, { useState, useEffect } from 'react';


const UserProfile= () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    image: 'assets/img/userprofile.jpg', // Add an image field to the profile object
  });
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

  const profileData = () => {
    const token = localStorage.getItem('Jwt_token');
   
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
        } else {
          const data = await response.json();
          setProfile(data);
        }
      });
    }
  }
  // localStorage.setItem('name',profile.name);
  // localStorage.setItem('email',profile.email);//2-09-2023
//   const UserData = JSON.parse(localStorage.getItem('profile'));
// console.log(UserData.name);//works 1-10-2023

  useEffect(() => {
   profileData();
    
  }, []);
  


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 mx-auto">
      <div className="col-md-12">
      <div className="form-floating mb-3">
          {/* Display the profile image in a circular shape */}
          <div className="mb-3 text-center">
            {/* Create a clickable circular image */}
            <label htmlFor="profileImage" className="profile-image-label">
              <div
                className="profile-image"
                // style={{
                //   backgroundImage: `url(${profile.image})`,
                // }}
              ></div>
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
        </div>
        <div className="col-md-9 mx-auto">
        <div className="form-floating mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Name: {profile.name}</h5>
              <p className="card-text">Email: {profile.email}</p>
               <button onClick={profileData}>Refresh</button>
               {/* <td>{ UserData }</td> */}
               {/* <table>
  <tr>
    <td>Name:</td>
    <td>{ UserData.name }</td>
  </tr>
  <tr>
    <td>Email:</td>
    <td>{ UserData.email }</td>
  </tr>
</table> */}

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

export default UserProfile;
