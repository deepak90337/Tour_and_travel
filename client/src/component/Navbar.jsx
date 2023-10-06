import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

export default function Navbar() {
  return (
 <>
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <a className="navbar-brand" href="https://www.google.com" style={{paddingLeft:20}}>
Menu
  </a>
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li >
        <a className="nav-link text-white nav-link-hover" href="/user">
          <span >Display User</span>
        </a>
      </li>
      
      <li className="nav-item">
        <a className="nav-link text-white" style={{ color: 'black' }}  href="/delete">
          DeleteUser
        </a>
      </li>
      <li className="nav-item ">
        <a
        
          className="nav-link  text-white"
          href="/userupdate"
         
        >
          UpdateUser
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/delete">
            Delete
          </a>
        </div>
      </li>
      
      <li className="nav-item">
        <a className="nav-link text-white" href="/adduser">
         AddUser 
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link hover text-white" href="/login">
          Login
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" href="/register">
          Register
        </a>
      </li>
    </ul>
    {/* <form className="d-flex">
      <input
        type="search"
        className="form-control me-2"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form> */}
  </nav>
 </>
  )
}

