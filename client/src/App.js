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
import UserUpdate from './admin/updateUser/updatetest1';
import Deleteuser from './admin/updateUser/deleteUser';
import { Routes,Route } from "react-router-dom";
import AddUser from "./admin/updateUser/addUser";
import React from "react";
import Userpage from "./pages/Userpage";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import LogBookedPack from "./component/LogBookedPack";
import HotelPage from "./pages/HotelPage";
import HotelBookingPage from "./pages/HotelBookingPage";
import EditProfile from "./pages/EditProfile";
import HotelViewComp from "./component/HotelViewComp";
import AdminProfilePage from "./pages/AdminProfilePage";
import EditAdminProfPage from "./pages/EditAdminProfPage";
import AddPackageBookPage from "./pages/admin_side_pages/AddPackageBookPage";
import PackageMntPage from "./pages/admin_side_pages/PackageMntPage";
import UserMntPage from "./pages/admin_side_pages/UserMntPage";
import UpdatePackagePage from "./pages/admin_side_pages/UpdatePackagePage";
import DeletePackageBookComp from "./component/admin_side_componets/DeletePackageBookComp";
import HotelMntPage from "./pages/admin_side_pages/HotelMntPage";
import AddHotelBookPage from "./pages/admin_side_pages/AddHotelBookPage";
import UpdateHotelBookPage from "./pages/admin_side_pages/UpdateHotelBookPage";
import DeleteHotelBookComp from "./component/admin_side_componets/DeleteHotelBookComp";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import { Provider } from 'react-redux';
import store from '../src/redux/store'; // Import your store file
import HotelPaymentPage from "./pages/HotelPaymentPage";
import PackagePaymentListPage from "./pages/admin_side_pages/PackagePaymentListPage";
import HotelPaymentListPage from "./pages/admin_side_pages/HotelPaymentListPage";


function App() {
  return (
  
    <div className="App">
        <Provider store={store}>
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
        <Route path="/userupdate" element={ <UserUpdate/> } />
        <Route path="/delete" element={<Deleteuser/>} />
        <Route path="/adduser" element={<AddUser/>} />
        {/* User's Profile Page */}
        <Route path="/userpage" element={<Userpage/>} />
        <Route path="/admin-profile" element={<AdminProfilePage/>} />


        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/adminregister" element={<AdminRegister/>} />


        {/* Not Used Components */}
        {/* <Route path="/bookinglist" element={<Bookinglist/>} /> */}
        {/* <Route path="/delete-booking" element={<DeleteBooking/>} /> */}
        {/* <Route path="/imageUpload" element={<ImageUpload/>} /> */}
        {/* <Route path="/delete-hotelbooking" element={<DeleteHotelBooking/>} /> */}

        {/* User Side Features to view bookings */}
        <Route path="/loggedbooking" element={<LogBookedPack/>} />
        <Route path="/viewHotelBookings" element={<HotelViewComp/>} />


        <Route path="/hotelpage" element={<HotelPage/>} />
        <Route path="/hotelbooking" element={<HotelBookingPage/>} />
        

        {/* Admin Profile */}
        <Route path="/editProfile" element={<EditProfile/>} />
        <Route path="/edit-admin-profile" element={<EditAdminProfPage/>} />
       
        
        <Route path="/dashboard" element={<UserMntPage/>}/>
       
       
        {/* 22-01-2024  for admin package management*/}
        <Route path="/package-dashboard" element={<PackageMntPage/>}/>
        <Route path="/packageupdate" element={<UpdatePackagePage/>} />
        <Route path="/packagedelete" element={<DeletePackageBookComp/>} />
        <Route path="/add-package-booking" element={<AddPackageBookPage/>} />


         {/* 24-01-2024  for admin hotel management*/}
         <Route path="/hotel-dashboard" element={<HotelMntPage/>} />
         <Route path="/add-hotel-booking" element={<AddHotelBookPage/>} />
         <Route path="/update-hotel-booking" element={<UpdateHotelBookPage/>} />
         <Route path="/delete-hotel-booking" element={<DeleteHotelBookComp/>} />
      

       
  
          {/* Payment Routes */}
          <Route path="/hotel-payment" element={<HotelPaymentPage/>}/>
          <Route path="/paymentsuccess" element={<PaymentSuccessPage/>}/>
          {/* Admin SIde */}
          <Route path="/package-payment-list" element={<PackagePaymentListPage/>}/>
          <Route path="/hotel-payment-list" element={<HotelPaymentListPage/>}/>
     </Routes>  
     <Footer />  
     </Provider>
	
        
    </div>
   
  );
}

export default App;
