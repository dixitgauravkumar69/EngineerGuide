import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <h1>EngineerGuide</h1>
      </div>
      <div className="button-group">
        <Link to="/login">
        <button className="login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
