import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          🛡️ <span>ACS Network</span>
        </Link>

        <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-links ${isOpen ? 'mobile-open' : ''}`}>
          {user ? (
            <>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/report-incident" 
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Report Incident
              </NavLink>
              <NavLink 
                to="/my-reports" 
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                My Reports
              </NavLink>
              <span className="navbar-link" style={{ color: 'var(--accent-cyan)', fontWeight: '600', borderLeft: '1px solid var(--glass-border)', paddingLeft: '1.2rem' }}>
                👤 {user.name}
              </span>
              <button onClick={handleLogout} className="navbar-btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/" 
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/login" 
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
