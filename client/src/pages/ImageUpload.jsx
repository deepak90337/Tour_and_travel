import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../assets/userprofile.jpg'

const ImageUpload = () => {
  // const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [textData, setTextData] = useState('');
  const [image,setImage] = useState(''); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', file); // Attach the file
      formData.append('textData', textData); // Attach text data

      const response = await axios.post('http://localhost:5000/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file uploads
        },
      }).then(res=>setImage(res.data[0].image))

      console.log(response.data); // Handle successful response
    } catch (error) {
      console.error(error); // Handle errors
    }
  };

  useEffect( ()=>{
    axios.post('http://localhost:5000/api/view-image')
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  },[])

  return (
    <>
     <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row justify-content-center py-5">
                        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                            <h1 className="display-3 text-white animated slideInDown">Destination</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">Destination</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
              <img src={image || Avatar} alt='not'/>
      <input type="file" onChange={handleFileChange} />
      <input type="text" value={textData} onChange={(e) => setTextData(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
    </>
   
  );
};

export default ImageUpload;
