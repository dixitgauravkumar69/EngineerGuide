import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-left">
        <h1>Let's Start with us your engineering carrier</h1>
        <p>
          Over <span className="highlight">10 thousent</span> students trust us for their preparation
        </p>

      </div>

      <div className="hero-right">
        <img src="/home.png" alt="Hero Illustration" />
      </div>
    </div>
  );
};

export default Hero;
