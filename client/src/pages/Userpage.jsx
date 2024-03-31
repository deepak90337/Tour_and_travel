import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from '../component/UserProfile';
import AdminProfileComp from '../component/AdminProfileComp';

const Userpage = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    // Simulate loading for 2 seconds, replace with your actual loading logic
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);
         const userToken = localStorage.getItem('Jwt_token');
         const adminToken = localStorage.getItem('admin_token');

  const renderComp = () =>{
    if (userToken) {
        return <UserProfile/>
    } 
    if(adminToken){
     return <AdminProfileComp/>
    }

    if(!userToken && !adminToken){
            navigate('/login')
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
            <div className="container-fluid bg-primary py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row justify-content-center py-5">
                        <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                            <h1 className="display-3 text-white animated slideInDown">{userToken ? "User Profile" :  adminToken ? "Admin Profile" : "Login Again"}</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
    
                                    <li className="breadcrumb-item text-white active" aria-current="page">{userToken ? "User Profile" : adminToken ? "Admin Profile" : "Login Again"}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
                )}
                {renderComp()}
        </>
    )
}

export default Userpage;