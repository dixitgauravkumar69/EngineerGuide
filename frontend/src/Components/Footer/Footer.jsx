import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <h2 className="logo">
            <span className="logo-icon">📘</span> EnginnerGuide
          </h2>
          <p className="desc">
            EngineerGuide is democratising education, making it accessible to all.
            Join the revolution.
          </p>
         

          <div className="reach-us">
            <h4>Reach out to us</h4>
            <p>Get your questions answered about learning with EnginnerGuide.</p>
            <p>📞 Call <strong>+91 8585858585</strong></p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Shikshodaya</li>
              <li>Careers</li>
              <li>Blogs</li>
              <li>Privacy policy</li>
              <li>Terms and conditions</li>
            </ul>
          </div>
          <div>
            <h4>Help & support</h4>
            <ul>
              <li>User Guidelines</li>
              <li>Site Map</li>
              <li>Refund Policy</li>
              <li>Takedown Policy</li>
              <li>Grievance Redressal</li>
            </ul>
          </div>
          
        </div>

        <div className="footer-categories">
          <div>
            <h4>Popular Branches</h4>
            <ul>
              <li>CSE</li>
              <li>CIVIL</li>
              <li>MACHANICAL</li>
              <li>EC</li>
              <li>EE</li>
            </ul>
          </div>
          <div>
            <h4>EnginneringGuide Centre</h4>
            <ul>
              <li>SIStec-GN</li>
              <li>SIStec-RB</li>
             
            </ul>
          </div>
          <div>
            <h4>Study material</h4>
            <ul>
              <li>BASICS OF WEB-DEVLOPMENT Material</li>
              <li>BASICS OF APP-DEVLOPMENT Material</li>
              <li>BASICS OF AI AND ML Material</li>
              <li>BASICS OF CYBER-SECURITY  Material</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 SIStec</p>
        <div className="socials">
          <span>📘</span>
          <span>📺</span>
          <span>🐦</span>
          <span>📷</span>
          <span>🔗</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
