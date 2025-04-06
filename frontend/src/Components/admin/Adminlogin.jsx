import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Adminlogin.css";

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`Welcome, ${data.admin.name}`);
        navigate("/admin/dashboard");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        <div className="left-image">
          <img src="/adminlogin.png" alt="Admin Visual" />
        </div>

        <div className="right-card">
          <h2 className="admin-title">Admin Login</h2>
          <form onSubmit={handleLogin} className="admin-form">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p className="admin-message">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
