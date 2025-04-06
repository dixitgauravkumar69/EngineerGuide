import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    branch: "",
    semester: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`Welcome, ${formData.name}!`);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          branch: "",
          semester: "",
          image: null,
        });
        navigate("/");
      } else {
        setMessage(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="left-card">
          <div className="logo-container">
            <img src="/logo.png" alt="EngineeringGuide" className="logo-img" />
          </div>
         
          

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Branch</label>
              <select name="branch" value={formData.branch} onChange={handleChange} required>
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                <option value="EE">EE</option>
              </select>
            </div>

            <div className="form-group">
              <label>Semester</label>
              <select name="semester" value={formData.semester} onChange={handleChange} required>
                <option value="">Select Semester</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{`${i + 1}`}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Upload Profile Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleChange} required />
            </div>

            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>

        <div className="right-image">
          <img src="/signup.png" alt="Right Visual" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
