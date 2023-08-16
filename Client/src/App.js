
import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/others/PrivateRoute';
import Register from './components/register/Register';
import Navbar from './components/others/Navbar';
import ErrorPage from './components/others/ErrorPage';

const App = () => {
  //const message = 'This is the admin dashboard';
  return (
    <>
       <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Use "element" instead of "component" */}
        <Route path="*" element={<PrivateRoute/>} /> {/* Use "element" instead of "children" */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/*" element={ <ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
