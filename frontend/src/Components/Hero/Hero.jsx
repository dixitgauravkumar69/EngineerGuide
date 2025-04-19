import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./Hero.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Hero = () => {
  const [modules, setModules] = useState([]);
  const [openPDF, setOpenPDF] = useState(null);
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

  const selectedModule = modules.find((mod) => mod._id === openPDF);

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
        <div className={`Modules ${openPDF ? "pdf-open" : ""}`}>
          <h1>Your Modules</h1>

          <div className="module-pdf-layout">
            <div className="module-cards-scroll">
              {modules.map((module) => (
                <div className="module-card" key={module._id}>
                  <h3>{module.moduleName}</h3>
                  <p>Branch: {module.branch}</p>
                  <p>Semester: {module.semester}</p>

                  {module.fileUrl ? (
                    <div className="pdf-preview">
                      <Document
                        file={module.fileUrl}
                        // onLoadError={(error) =>
                        //   // console.error("PDF load error:", error)
                        // }
                      >
                        <Page pageNumber={1} width={350} />
                      </Document>
                    </div>
                  ) : (
                    <p style={{ color: "gray" }}>No PDF file specified.</p>
                  )}

                  <button
                    className="view-button"
                    onClick={() =>
                      setOpenPDF(openPDF === module._id ? null : module._id)
                    }
                  >
                    {openPDF === module._id ? "Hide PDF" : "View Full PDF"}
                  </button>
                </div>
              ))}
            </div>

            {openPDF && selectedModule && selectedModule.fileUrl && (
              <div className="pdf-viewer">
                <iframe
                  src={selectedModule.fileUrl}
                  title="Full PDF"
                  width="100%"
                  height="1000px"
                  style={{ border: "none" }}
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
