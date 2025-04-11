import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [modules, setModules] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storedUser) {
      fetch("http://localhost:3000/api/UserModule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          branch: storedUser.branch,
          semster: storedUser.semster,
        }),
      })
        .then((res) => res.json())
        .then((data) => setModules(data))
        .catch((err) => console.error("Error fetching modules:", err));
    }
  }, []);

  return (
    <>
      <div className="hero-container">
        <div className="hero-left">
          <h1>Let's Start with us your engineering career</h1>
          <p>
            Over <span className="highlight">10 thousand</span> students trust
            us for their preparation
          </p>
        </div>

        <div className="hero-right">
          <img src="/home.png" alt="Hero Illustration" />
        </div>
      </div>

      {storedUser && (
        <div className="Modules">
          <h1>Your Modules</h1>
          <div className="module-cards">
            {modules.map((module) => (
              <div className="module-card" key={module._id}>
                <h3>{module.moduleName}</h3>
                <p>Branch: {module.branch}</p>
                <p>Semester: {module.semester}</p>
                <a
                  href={module.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
