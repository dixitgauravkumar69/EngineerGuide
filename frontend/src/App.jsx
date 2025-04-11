import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navigation/Navbar";
import Hero from "./Components/Hero/Hero";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/login/Login"; 
import Signup from "./Components/Signup/Signup"; 
import AdminLogin from "./Components/admin/adminlogin"; 
import AdminSignup from "./Components/admin/adminsignup";
import AdminDashboard from "./Components/admin/admindashboard/adminDashboard"; 
import Seestudents from "./Components/admin/seestudent/Seestudent"; 
import UploadModule from "./Components/admin/upload-module/Uploadmodule";

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
        <Route path="/admin/dashboard/upload-module" element={<UploadModule />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
