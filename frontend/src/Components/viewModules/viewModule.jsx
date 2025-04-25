import React, { useEffect, useState, useRef } from "react";
import "./viewModule.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ViewModule = () => {
  const { courseId } = useParams();
  const [pdfUrl, setPdfUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [error, setError] = useState(null); // Error state for any issues
  const viewerRef = useRef(null);

  // Fetch course PDF and progress on mount
  useEffect(() => {
    const fetchPDF = async () => {
      setLoading(true); // Show loading state when starting the fetch
      setError(null); // Reset previous error message

      try {
        const response = await axios.get(`http://localhost:3000/api/courses/${courseId}`);


        console.log(response.data); // Log the response data for debugging
        console.log(response.data.fileUrl); // Log the response data for debugging


        if (response.data.pdfUrl) {
          setPdfUrl(`http://localhost:3000${response.data.fileUrl}`);
          fetchProgress(response.data.fileUrl); // Fetch progress after getting the PDF URL
        } else {
          setError("PDF file not found.");
        }
      } catch (error) {
        setError("Error fetching course PDF.");
      }
    };

    const fetchProgress = async (url) => {
      try {
        const progressRes = await axios.get(`http://localhost:3000/api/get-progress/${courseId}`);
        if (progressRes.data.success) {
          const savedProgress = progressRes.data.progressPercentage || 0;
          const savedPage = Math.ceil((savedProgress / 100) * totalPages);
          setCurrentPage(savedPage > 0 ? savedPage : 1);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false); // Stop loading once progress fetch is completed
      }
    };

    fetchPDF(); // Initial fetch of PDF and progress
  }, [courseId, totalPages]); // Only re-fetch when courseId or totalPages changes

  // Render the PDF document
  useEffect(() => {
    if (pdfUrl && !loading) {
      const renderPDF = async () => {
        try {
          const loadingTask = pdfjsLib.getDocument(fileUrl);
          const pdf = await loadingTask.promise;
          setTotalPages(pdf.numPages);

          const renderPage = async (pageNumber) => {
            const page = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            viewerRef.current.innerHTML = ''; // Clear previous page content
            viewerRef.current.appendChild(canvas);

            page.render({ canvasContext: ctx, viewport: viewport });
          };

          renderPage(currentPage); // Render the current page
        } catch (error) {
          console.error("Error rendering PDF:", error);
          setError("Error rendering PDF.");
        } finally {
          setLoading(false); // Stop loading once PDF is rendered
        }
      };

      renderPDF();
    }
  }, [pdfUrl, currentPage]); // Re-render PDF when URL or page changes

  // Handle navigation to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateProgress(newPage);
    }
  };

  // Handle navigation to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updateProgress(newPage);
    }
  };

  // Update progress on the server
  const updateProgress = async (newPage) => {
    const progressPercentage = totalPages > 0 ? (newPage / totalPages) * 100 : 0;

    if (!courseId) {
      console.error("Error: courseId is undefined while updating progress!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/update-progress", {
        courseId,
        progressPercentage: progressPercentage.toFixed(2),
      });
    } catch (error) {
      console.error("Error updating progress:", error.response?.data || error);
    }
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div className="loading">Loading PDF...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="pdf-container">
      <h2 className="title">Course PDF Viewer</h2>

      <div ref={viewerRef} className="pdf-viewer">
        {/* PDF content will render here */}
      </div>

      <div className="progress-container">
        <p className="page-indicator">Page {currentPage} of {totalPages}</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          ></div>
        </div>
        <p className="progress-percent">{((currentPage / totalPages) * 100).toFixed(2)}% completed</p>
      </div>

      <div className="button-group">
        <button
          className="nav-button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="nav-button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewModule;
