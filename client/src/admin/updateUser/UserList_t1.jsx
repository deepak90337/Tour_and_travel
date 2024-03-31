import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/Navbar';
import * as XLSX from 'xlsx';
import { FaFileExport } from 'react-icons/fa6';

const UserListTest = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [search,setsearch] = useState("");
  const navigate = useNavigate();

  const redirectDelete = (userId) =>{
    navigate(`/delete?user=${userId}`);
  }
  const redirectUpdate = (userId,userName,userEmail) =>{
    navigate(`/userupdate?user=${userId}&username=${userName}&useremail=${userEmail}`);
  }
  const redirectAdd = () =>{
    navigate("/adduser");
  }

  const handleChange = (e) => {
    setsearch(e.target.value);
  };
 const totalPages = Math.ceil(results.length / resultsPerPage)
  //Handle search 
  const handleSearch = async (e,currentpage) => {
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
     //For pagination
     if (data.length > 0) {
      const totalPages = Math.ceil(data.length / resultsPerPage);
      setCurrentPage(Math.min(currentpage, totalPages));
    }
     setResults(data);
     setShowAlert(false);
    //  console.log(data);
   } catch (error) {
     setShowAlert(true);
     console.error('Error fetching users:', error);
   }
 }

  useEffect( () => {
    // Fetch results from backend, optimized for pagination
    setIsLoading(true);
   fetch(`http://localhost:5000/api/users`)
      .then((response) => response.json())
      .then((fetchedResults) => {
        setResults(fetchedResults);
      })
      .finally(() => setIsLoading(false));
  },[]);

  const paginatedResults = results.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

  const handleResultsPerPageChange = (event) => {
    const newResultsPerPage = parseInt(event.target.value);
  
    // Calculate the new page number based on the new results per page
    const newCurrentPage = Math.min(currentPage, Math.ceil(results.length / newResultsPerPage));
  
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(newCurrentPage);
  };
  
  
  const handleExport = () => {
    const filteredData = results.map((user) => ({
      User_ID: user._id,
      User_Name: user.name,
      User_Email: user.email
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData); // Assuming paginatedResults is your user data
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users.xlsx');
  };
  

  return (
    <div>
<div>
    {/* Nav Start */}
    <div>
    <Navbar/>
    </div>
        {/* Nav End */}

        {/* User table start */}
    <div className='user-table'>
    <div className='pagination_controls'>
    <div className='pagination_num'>
      <label> Set No. of Records</label>
     
        <select value={resultsPerPage} onChange={handleResultsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
        </select>
        </div>
        <div className='pagination_nav'>
          <div>
          <button className="previous" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
          </div>
          <div>
          <button className="next" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * resultsPerPage >= results.length}>
              Next
            </button>
          </div>
          </div>

          {/* search Field start */}
          <div className='search-field'>
            <div>
                <th> <input
                 onChange={handleChange} type="search" className="form-control"
                  placeholder="Search by name" aria-label="Search"/> </th>
                  </div>
           
        <div>
        <th><button onClick={(e) => handleSearch(e, currentPage)} className="btn btn-outline-primary  py-1.5 px-4 me-3">
        Search</button>  </th> 
        </div>
        <div>
        <Button variant="primary rounded-pill " className='add_booking' onClick={redirectAdd}>Add New User</Button>
        </div>
       </div>
          {/* search Field End */}
          <div className='export-cont' onClick={handleExport}>
        {/* <button className="exp-btn-txt" onClick={handleExport}><label className="exp-btn-txt" style={{paddingRight: 7}}> Export to Excel</label> */}
        <button type="button" className="btn btn-primary export-btn">Export Button  <FaFileExport/></button>
        

        </div>
    </div>
             {isLoading ? (
        <p>Loading results...</p>
      ) : (
        <div>
      
      <div className='table-Heading'>
          <div className='h-1 text-black'>ID</div>
          <div className='h-2 text-black'>Name</div>
          <div className='h-3 text-black'>Email</div>
          <div className='h-4 text-black'>Actions</div>
      </div>
        
      
       
        <div className='usertable'>
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
          
        <table className='table striped hover'>
         
          <ul>
            {paginatedResults.map((result) => (
              <tr key={result._id}>
                <div className='user-detail text-black'><td>{result._id}</td></div> 
                <div className='user-detail text-black'><td>{result.name}</td></div>
                <div className='user-detail user-email text-black'> <td>{result.email}</td></div>
                
                
               
                <div className='table-btn'>
                <td>
                <Button variant="primary rounded-pill " onClick={() => redirectUpdate(result._id,result.name,result.email)}>Update</Button>
              </td>
                </div>
              <div className='table-btn'>
              <td>
                <Button variant="danger rounded-pill " onClick={() => redirectDelete(result._id)}>Remove</Button>
              </td>
              </div>
              <div className='table-btn'>
              </div>
             
              </tr>
            
            ))}
          </ul></table>
</div>
        </div>
      )}
    </div>
    <p className='ps-5'>
    Showing Page {currentPage} of {totalPages}
  </p>
     {/* User table End */}
     </div>
    </div>
   
  );
};

// ... (rest of your component code)
export default UserListTest;