import Footer from "./component/Footer";
import Header from "./component/Header";
import About from "./pages/About";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Destination from "./pages/Destination";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Packages from "./pages/Packages";
import Payment from "./pages/Payment";
import Register from "./pages/Register";
import Services from "./pages/Services";
import User from './admin/usercontrol';
import UserUpdate from './admin/updateUser/updatetest1';
import Deleteuser from './admin/updateUser/deleteUser';
import { Routes,Route } from "react-router-dom";
import AddUser from "./admin/updateUser/addUser";
import React from "react";
import Userpage from "./pages/Userpage";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Bookinglist from "./pages/Bookinglist";
 import DeleteBooking from "./pages/DeleteBooking";

function App() {
  return (
    <div className="App">
    
		 <Header />
     <Routes>

       <Route path="/" element={<Home/>} />
       <Route path="/about" element={<About />} />
       <Route path="/services" element={<Services />} />
       <Route path="/packages" element={<Packages />} />
       <Route path="/destination" element={<Destination />} />
       <Route path="/booking" element={<Booking />} />
       <Route path="/contact" element={<Contact/>} />
       <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/payment" element={<Payment/>}/>  
       <Route path="/user" element={ <User/> } />
        <Route path="/userupdate" element={ <UserUpdate/> } />
        <Route path="/delete" element={<Deleteuser/>} />
        <Route path="/adduser" element={<AddUser/>} />
        <Route path="/userpage" element={<Userpage/>} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/adminregister" element={<AdminRegister/>} />
        <Route path="/bookinglist" element={<Bookinglist/>} />
        <Route path="/delete-booking" element={<DeleteBooking/>} />
     </Routes> 
     <Footer />  

	
        
    </div>
  );
}

export default App;
