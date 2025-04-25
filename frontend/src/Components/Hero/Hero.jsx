import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import "./Hero.css";


// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

const Hero = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [openPDF, setOpenPDF] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [progress, setProgress] = useState(0);
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
        .then((data) => {
          setModules(data);
        })
        .catch((err) => console.error("Error fetching modules:", err));
    }
  }, []);

  

  
  return (
    <>
      <div className="hero-container">
        <div className="hero-left">
          <h1>Let's Start with us your engineering career</h1>
          <p>
            Over <span className="highlight">10 thousand</span> students trust us for their preparation
          </p>
        </div>
        <div className="hero-right">
          <img src="/home.png" alt="Hero Illustration" />
        </div>
      </div>

      {storedUser && (
        <div className="modules-section">
          <h1>Your Modules</h1>

          <div className={`module-wrapper ${openPDF ? "pdf-open" : ""}`}>
            <div className={`module-cards ${openPDF ? "cards-column" : "cards-row"}`}>
              {modules.map((module) => (
                <div className="module-card" key={module._id}>
                  <h3>{module.moduleName}</h3>
                  <p>Branch: {module.branch}</p>
                  <p>Semester: {module.semester}</p>

                 

                  <button  onClick={() => navigate(`/viewModule/${module._id}`)}>View_Content</button>
                </div>
              ))}
            </div>

           
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
