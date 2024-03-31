import React, { useEffect, useState } from 'react'
import Avatar from '../assets/userprofile.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfileComponent() {
  const preset = localStorage.getItem("userProfilepic") ==="http://localhost:5000/temp/undefined" 
   ? Avatar : localStorage.getItem("userProfilepic")
    const [profile, setProfile] = useState({
        image: preset, // Add an image field to the profile object
      });//Keep old Profile pic if not changed
      const [showPic,setShowPic] = useState({});
    const [ userName,setUsername] = useState( localStorage.getItem("LoggedUserName")) 
    const [ userEmail,setUserEmail] = useState( localStorage.getItem("LoggedUserEmail"))
    const navigate = useNavigate();

    const handleImageChange = (e) => {
          setProfile( e.target.files[0])
          const file = e.target.files[0]; // Get the first file from the selected files

          // Check if a file was selected
          if (file) {
            const reader = new FileReader();
        
            // Define the onload event handler for the reader
            reader.onload = () => {
              // Update the profile state with the data URL of the selected image
              setShowPic(reader.result);
            };
        
            // Read the selected file as a data URL
            reader.readAsDataURL(file);
          }
        }
     console.log(preset)

    const handleNameChange=(e)=>{
     setUsername(e.target.value)  
    }

    const handleEmailChange=(e)=>{
        setUserEmail(e.target.value)   
       }

       useEffect(() => {
        
        // const preSet = localStorage.getItem("userProfilepic") ;
        // if (preSet) {
            setShowPic(preset);
            
//  console.log(preSet)
        // }

}, [preset]);

    const handleSubmit =async (event)=>{
        event.preventDefault();

        try {
          const formData = new FormData();
          formData.append('file', profile); // Attach the file
          formData.append('username', userName); // Attach text data
          formData.append('useremail', userEmail); 
          // formData.append('user_old_pic', localStorage.getItem('userProfilepic') || '');
          const userProfilepic = localStorage.getItem('userProfilepic');
          const filename = userProfilepic ? userProfilepic.split('/').pop() : '';
          formData.append('user_old_pic', filename);

// Send form data to backend

          formData.append('token',localStorage.getItem("Jwt_token"))
          console.log("EditProfile.jsx",formData.username)
          const response = await axios.post('http://localhost:5000/api/editprofile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type for file uploads
            },
          }).then((res)=>{setProfile(res.data.profile_pic)
            // console.log("edit profile.jsx line 42",res.data)
          if(res.status === 200){
            navigate('/userpage');}
            
          if(res.status === 400){
            alert("Enter Some Value ")}
          })

    
          console.log(response.data); // Handle successful response
        } catch (error) {
          console.error(error); // Handle errors
        } }
        
  return (
    <>
    <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-6 mx-auto">
      <h1 className="text-primary mb-4">Edit Your Profile</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3 text-center">
            {/* Create a clickable circular image */}
            <label htmlFor="profileImage" className="profile-image-label">
      {/* <img src={Avatar}
                alt='Pic Not Available'/> */}
            <img
                className="profile-image"
                src={showPic || Avatar}
                alt='Pic Not Available'
              /><i className="fas fa-pencil-alt edit-icon"></i>
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
      <div className="row">
          <div className="col-md-12 mb-3">
  <input type="text" name="userID" value={userName} onChange={handleNameChange} class="form-control py-3" placeholder="UserName" />
  </div>
  </div>
  <div className="row">
          <div className="col-md-12 mb-3">
          <input type="text" name="username" value={userEmail} onChange={handleEmailChange} class="form-control py-3" placeholder="UserEmail" />
  </div>
  </div>
  <div className='row' >
          <div className="col-md-4 mx-auto">
  <button type="submit" className='btn btn-primary btn-lg py-3 col-md-12'>Submit</button>
  </div>
  </div>
  </form>
    </div>
    </div>
    </div>
    </>
  )
}

export default EditProfileComponent
