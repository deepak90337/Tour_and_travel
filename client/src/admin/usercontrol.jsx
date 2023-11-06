import React, { useState, useEffect } from 'react';
//import UpdateForm from './updateUser/updateform';
import Navbar from '../component/Navbar';
import { Button} from "react-bootstrap";
import {  useNavigate } from 'react-router-dom';
//import Select from 'react-bootstrap-select';
//import {input} from 'react-bootstrap-input';
//import Deleteuser from './updateUser/deleteUser';

export default function User(){
//  const [ setSelectedUser] = useState("abc1");
//   const [setShowUpdateForm] = useState(false);
const [search,setsearch] = useState("");
const [results, setResults] = useState([]);
const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setsearch(e.target.value);
  };
const redirectDelete = (userId) =>{
  navigate(`/delete?user=${userId}`);
}
const redirectUpdate = (userId,userName,userEmail) =>{
  navigate(`/userupdate?user=${userId}&username=${userName}&useremail=${userEmail}`);
}
const redirectAdd = () =>{
  navigate("/adduser");
}
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    
    try {
      const response = await fetch('http://localhost:5000/api/users'); // Change this URL to your API endpoint
      const data = await response.json();
      setUsers(data);
     
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = async (e) => {
     // setErrors(newErrors);
     e.preventDefault();
     const body = JSON.stringify({
      name:search
    
    });
    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body
        //body: JSON.stringify({name:search}),
      }); // Change this URL to your API endpoint
      const data = await response.json();
      setResults(data);
      console.log(data);
    } catch (error) {
      setShowAlert(true);
      console.error('Error fetching users:', error);
    }
  }

  const renderResults = () => {
    if (results.length > 0  && search) {
      return (
        <ul>
          {results.map((result) => (
            <tr key={result._id}>
              <td>{result._id}</td>
              <td>{result.name}</td>
              <td>{result.email}</td>
            </tr>
          ))}
        </ul>
      );
    } else {
     
      return <p>No results found</p>;
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

        <table className="table striped hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
           <th> <input
           onChange={handleChange}
        type="search"
        className="form-control"
        placeholder="Search by name"
        aria-label="Search"
      />
      </th> <th><button onClick={handleSearch} className="btn btn-outline-primary rounded-pill py-2 px-4 me-3">
        Search
      </button>  
    </th> 
            {/* <th>Phone</th>
            <th>Role</th> */}
          </tr>
        </thead>
        {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show">
          <button
            type="button"
            className="btn-close "
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          ></button> No results found
          </div>
        )}
        {renderResults()}
        <tbody>
        

          {users.map((user) => (
            <tr key={user.name}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.phone}</td> */}
              {/* <td>{user.role}</td> */}
              <td>
                <Button variant="primary rounded-pill " onClick={() => redirectUpdate(user._id,user.name,user.email)}>Update</Button>
              </td>
              <td>
                <Button variant="danger rounded-pill " onClick={() => redirectDelete(user._id)}>Remove</Button>
              </td>
              <td>
                <Button variant="primary rounded-pill " onClick={redirectAdd}>Add</Button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
     
  {/* <Button variant="primary"  > Update</Button> */}
             
  </>
  );
}