import React, { useEffect, useState } from 'react'
import Avatar from '../assets/userprofile.jpg'
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

function EditAdminProfileComp() {
  const preSet =  localStorage.getItem("admin-pic")!=="http://localhost:5000/temp" ? localStorage.getItem("admin-pic") :Avatar
    const [profile, setProfile] = useState({
        image: preSet, // Add an image field to the profile object
      });//Keep old Profile pic if not changed
      const [showPic,setShowPic] = useState({});
    const [ userName,setUsername] = useState( localStorage.getItem("admin-name")) 
    const [ userEmail,setUserEmail] = useState( localStorage.getItem("admin-email"))
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


    const handleNameChange=(e)=>{
     setUsername(e.target.value)  
    }

    const handleEmailChange=(e)=>{
        setUserEmail(e.target.value)   
       }

       useEffect(() => {
        
            const preSet = localStorage.getItem("admin-pic");
            if (preSet) {
                setShowPic(preSet);
                
     console.log(preSet)
            }
  
    }, [ ]);
    console.log(profile);
    const handleSubmit =async (event)=>{
        event.preventDefault();

        try {
          const formData = new FormData();
          formData.append('file', profile); // Attach the file
          formData.append('username', userName); // Attach text data
          formData.append('useremail', userEmail); 
          // formData.append('user_old_pic', localStorage.getItem('userProfilepic') || '');
          const userProfilepic = localStorage.getItem('admin-pic');
          const filename = userProfilepic ? userProfilepic.split('/').pop() : '';
          formData.append('user_old_pic', filename);

// Send form data to backend

          formData.append('token',localStorage.getItem("admin_token"))
          // console.log("EditProfile.jsx",formData.username)
          const response = await axios.post('http://localhost:5000/api/edit-admin-profile', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type for file uploads
            },
          })
          
          setProfile(response.data.profile_pic)
            // console.log("edit profile.jsx line 42",res.data)
            
           
          if(response.status === 200){
            navigate('/admin-profile');}
            
          if(response.status === 400){
            alert("Enter Some Value ")}

         
          // console.log("axios ki error",AxiosError);
          if(AxiosError.responsestatus === 401){
            alert("Token Expired")}

          // console.log(response.data); // Handle successful response
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
      <div className="mb-3 text-center profile-image-container">
            {/* Create a clickable circular image */}
            <label htmlFor="profileImage" className="profile-image-label">
      
            <img
                className="edit-profile-image"
                src={showPic}
                alt='Pic Not Available'
              /><i  className="fas fa-pencil-alt edit-icon"></i>
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
  <input type="text" name="userID" value={userName} onChange={handleNameChange} className="form-control py-3" placeholder="UserName" />
  </div>
  </div>
  <div className="row">
          <div className="col-md-12 mb-3">
          <input type="text" name="username" value={userEmail} onChange={handleEmailChange} className="form-control py-3" placeholder="UserEmail" />
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

export default EditAdminProfileComp;
