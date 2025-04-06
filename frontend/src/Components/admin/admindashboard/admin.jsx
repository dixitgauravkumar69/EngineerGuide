import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from ".../Components/Navigation/Navbar";
import AdminLogin from "./adminlogin"; 
import AdminSignup from "./adminsignup"; 
import AdminDashboard from "./adminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
       
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
       
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
