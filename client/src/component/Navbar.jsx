import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useAuth} from '../context/userAuthContext'

function Navbar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
const {user}=useAuth();
  const handleSetActive = (path) => {
    setActiveItem(path);
  };

  return (
    <>
 <div className='custom-navbar custom-navbar-expand-lg bg-primary mt-2 pt-2 custom-navbar-dark d-flex flex-wrap'>
  {/* Nav Start */}
  <div className="d-flex align-items-center flex-wrap">
    {/* Navbar brand */}
    <div className='mb-1'>
      <label className="custom-navbar-brand" style={{ paddingLeft: '20px' }}>
        Menu
      </label>
    </div>
    {/* View Users */}
    <div className='mb-1'>
      <Link
        to="/dashboard"
        className={`custom-nav-link text-white custom-nav-link-hover text-decoration-none ${activeItem === '/dashboard' ? 'active' : ''}`}
        onClick={() => handleSetActive('/dashboard')}
      >
        View Users
      </Link>
    </div>
    {/* View Package booking */}
    <div className='mb-1'>
      <Link
        to="/package-dashboard"
        className={`custom-nav-link text-white custom-nav-link-hover text-decoration-none ${activeItem === '/package-dashboard' ? 'active' : ''}`}
        onClick={() => handleSetActive('/package-dashboard')}
      >
        Package Bookings
      </Link>
    </div>
    {/* View Hotel booking */}
    <div className='mb-1'>
      <Link
        to="/hotel-dashboard"
        className={`custom-nav-link text-white custom-nav-link-hover text-decoration-none ${activeItem === '/hotel-dashboard' ? 'active' : ''}`}
        onClick={() => handleSetActive('/hotel-dashboard')}
      >
        Hotel Bookings
      </Link>
    </div>
    {/* View Payments dropdown */}
    <div className="dropdown mb-1 ">
      <label
        className={`custom-nav-link pay-menu text-white custom-nav-link-hover text-decoration-none ${activeItem === '/hotel-payment-list' || activeItem === '/package-payment-list' ? 'active' : ''}`}
        id="paymentsDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Payments
      </label>
      <ul className="dropdown-menu" aria-labelledby="paymentsDropdown">
        <li>
          <Link to="/hotel-payment-list" onClick={() => handleSetActive('/hotel-payment-list')} className="dropdown-item">
            Hotel Payments
          </Link>
        </li>
        <li>
          <Link to="/package-payment-list" onClick={() => handleSetActive('/package-payment-list')} className="dropdown-item">
            Package Payments
          </Link>
        </li>
      </ul>
    </div>
  </div>
  {/* Nav End */}

  <div className='admin-greet ms-auto'>
    <div className="text-white me-5">
      Hi, {user?.name || localStorage.getItem("admin-name")}
    </div>
  </div>
</div>
    </>
  );
}

export default Navbar;
