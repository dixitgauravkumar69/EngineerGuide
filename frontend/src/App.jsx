import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navigation/Navbar";
import Hero from "./Components/Hero/Hero";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/login/Login"; // Create this file
import Signup from "./Components/Signup/Signup"; // Create this file
import AdminLogin from "./Components/admin/adminlogin"; // Create this file
import AdminSignup from "./Components/admin/adminsignup"; // Create this file
import AdminDashboard from "./Components/admin/admindashboard/adminDashboard"; // Create this file
import Seestudents from "./Components/admin/seestudent/Seestudent"; // Create this file

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/see-students" element={<Seestudents />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
