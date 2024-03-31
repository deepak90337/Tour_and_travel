import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Navbar from '../Navbar';
import * as XLSX from 'xlsx';
import { FaFileExport } from "react-icons/fa6" 


export default function HotelPaymentList() {

  const [initialRows,setInitialRows] = React.useState([]);
  React.useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/payments/hotel-payments',{
          method:"POST",
        });
        const data = await response.json();
        const formattedData = formatData(data);
        const rowsWithIds = formattedData.map((row, index) => ({ ...row, id: index + 1 }));
        // Set the formatted data to state for rendering in the data grid
        setInitialRows(rowsWithIds);
        
        // Format date field if necessary
        // Set data to state for rendering in the data grid
        // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  },[])
  
  const handleExport = () => {
    const PaymentData = initialRows.map((hotelpayments) => ({
      Sr_No: hotelpayments.id,
      User_Email: hotelpayments.email,
      Hotel_Name: hotelpayments.hotel_name,
      Status: hotelpayments.status,
      order_id:hotelpayments.razorpay_order_id,
      Payment_Date:hotelpayments.date1,
      Hotel_Price:hotelpayments.price
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(PaymentData); // Assuming paginatedResults is your user data
    XLSX.utils.book_append_sheet(workbook, worksheet, 'hotels');
    XLSX.writeFile(workbook, 'hotel_payments.xlsx');
  };
  
  const formatData = (data) => {
    return data.map(item => ({
      
        date1: new Date(item.createdAt).toISOString().slice(0, 10),
        email: item.bookingDetails.email,
        price: item.bookingDetails.hotel_price,
        status: item.bookingDetails.isPaymentDone ? 'Paid' : 'Pending',
        hotel_name: item.bookingDetails.hotel_name,
      razorpay_order_id: item.razorpay_order_id,
    }));
  };
  



  return (
  <>
  <Navbar/>
  <div className='my-3 mx-auto w-100'><h3 className="text-center">Hotel Payment List</h3>
  </div>
  <div className="d-flex align-items-center justify-content-end mb-3">
    <div className="export-cont" onClick={handleExport}>
      <button type="button" className="btn btn-primary export-btn me-5">
        Export Button <FaFileExport />
      </button>
    </div>
  </div>
          <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={initialRows}
        columns={[
          { field: 'id', headerName: 'ID', width: 10 },
          { field: 'date1', headerName: 'Payment Date', width: 180 },
          { field: 'email', headerName: 'Email', width: 200 },
          { field: 'price', headerName: 'Price', width: 150 },
          { field: 'status', headerName: 'Status', width: 150 },
          { field: 'hotel_name', headerName: 'Destination', width: 200 },
          { field: 'razorpay_order_id', headerName: 'Order ID', width: 200 },
        ]}
        editMode="row"
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        // checkboxSelection
      /> </div>
</>
   
  );
}