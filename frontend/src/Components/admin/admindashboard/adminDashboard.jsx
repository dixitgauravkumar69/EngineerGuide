import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="logo">
          
          <h2>Admin Panel</h2>
        </div>
        <nav className="nav-links">
          <Link to="upload-module">Upload Module</Link>
          <Link to="see-students">See Students</Link>
          <Link to="pdf-to-quiz">PDF to Quiz</Link>
          <Link to="upload-quiz">Upload Quiz</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
