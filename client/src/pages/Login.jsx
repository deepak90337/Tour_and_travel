import React, { useEffect, useState } from 'react';
//import { Link  } from "react-router-dom";
import LoginComponent from '../component/LoginComponent';

const Login = () => {
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
          <LoginComponent/>
          )}
       </>
    );
};

export default Login;
