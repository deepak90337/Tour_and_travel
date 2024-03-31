import AddPackageForm from '../../component/admin_side_componets/AddPackageBookingComp';
import React, { useEffect, useState } from 'react';
const AddPackageBookPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds, replace with your actual loading logic
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const adminToken = localStorage.getItem('admin_token');

  const renderComp = () =>{
    if(adminToken){
      return  <AddPackageForm/>
    }
    else{
      return <h1>Cannot View Page</h1>
    }
  }
  
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
    {renderComp()}
    </>
  )
}

export default AddPackageBookPage;