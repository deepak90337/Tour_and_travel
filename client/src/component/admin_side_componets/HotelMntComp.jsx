import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/Navbar';
import * as XLSX from 'xlsx';
import { FaFileExport } from "react-icons/fa6" 
import {useDispatch} from 'react-redux'
import { setHotelForUpdate } from '../../redux/booking/hotelBookingSlice';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';



const HotelMntComp = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [search,setsearch] = useState("");
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const redirectDelete = (hId) =>{
    navigate(`/delete-hotel-booking?hId=${hId}`);
  }

//  hId,name,email,date1,hotel_name,hotel_type,
  // no_of_guest,check_in,check_out,hotel_price

  const redirectUpdate = (result) =>{
    // navigate(`/update-hotel-booking?hId=${hId}&username=${name}&useremail=${email}&date1=${date1}&htl=${hotel_name}
    // &type=${hotel_type}&nguest=${no_of_guest}&chk_in=${check_in}&chk_out=${check_out}&price=${hotel_price}`);
    dispatch(setHotelForUpdate(result))
    navigate('/update-hotel-booking')
  }
  const redirectAdd = () =>{
    navigate("/add-hotel-booking");
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
     const response = await fetch(`http://localhost:5000/hotels/hotels-search?keyword=${search}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body
       //body: JSON.stringify({name:search}),
     }); // Change this URL to your API endpoint
     const data = await response.json();
     if (data.length > 0) {
      const totalPages = Math.ceil(data.length / resultsPerPage);
      setCurrentPage(Math.min(currentpage, totalPages));
    }
     setResults(data);
    //  console.log(data);
   } catch (error) {
     setShowAlert(true);
     console.error('Error fetching users:', error);
   }
 }
 const handleResultsPerPageChange = (event) => {
  const newResultsPerPage = parseInt(event.target.value);

  // Calculate the new page number based on the new results per page
  const newCurrentPage = Math.min(currentPage, Math.ceil(results.length / newResultsPerPage));

  setResultsPerPage(newResultsPerPage);
  setCurrentPage(newCurrentPage);
};
  useEffect(() => {
    // Fetch results from backend, optimized for pagination
    setIsLoading(true);
    fetch(`http://localhost:5000/hotels/hotels-bookings`,{
      method: 'POST',
    })
      .then((response) => response.json())
      .then((fetchedResults) => {
        setResults(fetchedResults);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const paginatedResults = results.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

  // const [loading, setLoading] = useState(true);
  
  const handleExport = () => {
    const filteredData = results.map((hotelbookings) => ({
      Hotel_ID: hotelbookings._id,
      User_Name: hotelbookings.name,
      User_Email: hotelbookings.email,
      Hotel_Name: hotelbookings.hotel_name,
      No_of_Guest: hotelbookings.no_of_guest,
      Hotel_type: hotelbookings.hotel_type,
      Check_In_time:hotelbookings.check_in,
      Check_Out_time:hotelbookings.check_out,
      Hotel_Price:hotelbookings.hotel_price
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData); // Assuming paginatedResults is your user data
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'hotel_bookings.xlsx');
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
          {/* <div className='search-field'>
            <div>
                <th> <input
                 onChange={handleChange} type="search" className="form-control"
                  placeholder="Search by user,name,email" aria-label="Search"/> </th>
                  </div>
           
        <div>
        <th><button onClick={(e) => handleSearch(e, currentPage)} className="btn btn-outline-primary  py-1.5 px-4 me-3">
        Search</button>  </th> 
        </div>
        <div>
        <Button variant="primary rounded-pill " className='add_booking' onClick={redirectAdd}>Add New Booking</Button>
        </div>
       </div> */}
       <div className="search-field">
      <OverlayTrigger
        placement="top"
        delay={{ show: 50, hide: 100 }}
        overlay={<Tooltip>Search by user, name, or email</Tooltip>}
      >
        <div>
          <th>
            <input
              ref={searchInputRef}
              onChange={handleChange}
              type="search"
              className="form-control"
              placeholder="Search by user, name, email"
              aria-label="Search"
            />
          </th>
        </div>
      </OverlayTrigger>
      <div>
        <th>
          <button
            onClick={(e) => handleSearch(e, currentPage)}
            className="btn btn-outline-primary py-1.5 px-4 me-3"
          >
            Search
          </button>
        </th>
      </div>
      <div>
      <Button variant="primary rounded-pill " className='add_booking' onClick={redirectAdd}>Add New Booking</Button>
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
      
     
      
       
        <div className='usertable container'>
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
         
        
        <table className='table striped hover container-fluid'>
          {/* Table heading */}
          <ul>
          <tr className='table-head text-black'><td>Name</td>
          <td className='package-h-2 text-black'>Email</td>
          <td className='package-h-5 ms-2 text-black'>Date</td>
          <td className='package-h-3 ms-2 text-black'>Hotel</td>
          {/* <div className='package-h-6'>Flight</div> */}
          <td className='package-h-7 text-black'>Type</td>
          <td className='package-h-8 text-black'>No_guests</td>
          <td className='package-h-4 text-black'>Actions</td> </tr>
            {paginatedResults.map((result) => (
             
              <tr key={result._id} >
                <div className='user-detail text-black'><td className='user-name'>{result.name}</td></div>
                <div className='user-detail text-black'> <td className='user-email'>{result.email}</td></div>
                <div className='user-detail text-black'><td className='p-date'>{result.date1}</td></div>
                <div className='user-detail text-black'><td className='p-name'>{result.hotel_name}</td></div>
                {/* <div className='user-detail'><td>{result.flight}</td></div> */}
                <div className='user-detail text-black'><td  className='p-atime pe-5'>{result.hotel_type}</td></div>
                <div className='user-detail text-black'><td  className='p-dtime'>{result.no_of_guest}</td></div>
                {/* <div className='user-detail'><td>{result.price}</td></div> */}
        
                <div className='table-btn'>
                 
                <td>
                {/*  name ,email , date1,hotel_name,hotel_type,
      no_of_guest,check_in,check_out,hotel_price*/}
                <Button variant="primary rounded-pill " onClick={() => redirectUpdate(result)}>Update</Button>
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
export default HotelMntComp;