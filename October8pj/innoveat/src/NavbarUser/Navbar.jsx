import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';  // Import user icon
import logo from '../assets/InnoveatLogo.png'; 
import "./Navbar.css";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);  // Reference for dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="App-header">
      <div className="container-fluid">
        <div className="navbar d-flex justify-content-between align-items-center px-4 py-2">
          {/* Logo on the left */}
          <div className="logo-container">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </div>
          {/* Navigation links on the right */}
          <div className="nav-links d-flex align-items-center">
            <Link to="/Home" className="button">Home</Link>
            <Link to="/AboutUs" className="button">About Us</Link>
            <Link to="/Services" className="button">Services</Link>
            <Link to="/Portfolio" className="button">Portfolio</Link>
            
            {/* User icon with dropdown */}
            <div className="user-icon-container" onClick={toggleDropdown} ref={dropdownRef}>
              <FaUser className="button user-icon" />  {/* Apply "button" class here */}
              {dropdownOpen && (
                <div className="dropdown-menu">
  
                  <Link to="/" className="dropdown-item">Sign out</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;