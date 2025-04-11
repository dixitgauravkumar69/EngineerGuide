import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user)); 
        alert(`Welcome back, ${data.user.name}!`);
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <div className="left-image">
          <img src="/login.png" alt="Signin Visual" />
        </div>
        <div className="right-card">
          <h2 className="signin-title">Log In</h2>
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="form-remember">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>
            <button type="submit" className="signin-button">Sign In</button>
          </form>
          <p className="signup-redirect">
            Don't have an account?
            <Link to="/Signup"> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
