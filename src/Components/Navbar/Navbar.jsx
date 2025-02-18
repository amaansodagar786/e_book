import React, { useEffect, useState } from 'react';
import { FaUser, FaBook, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Icons from react-icons
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if token exists
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    setIsLoggedIn(false);
    
    window.location.reload(); // Reload page to update UI
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="/">
          <span>E-Book App</span>
        </a>
      </div>

      <div className="navbar__links">
        {isLoggedIn ? (
          <>
            <a href="/categories" className="navbar__link">
              <FaBook className="navbar__icon" />
              <span>Categories</span>
            </a>

            <button className="navbar__link navbar__logout" onClick={handleLogout}>
              <FaSignOutAlt className="navbar__icon" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="navbar__link">
              <FaSignInAlt className="navbar__icon" />
              <span>Login</span>
            </a>
            <a href="/register" className="navbar__link">
              <FaUser className="navbar__icon" />
              <span>Register</span>
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
