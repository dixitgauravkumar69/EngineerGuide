import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadModule.css";

const UploadModule = () => {
  const [formData, setFormData] = useState({
    moduleName: "",
    branch: "",
    semester: "",
    dateTime: new Date().toLocaleString(),
    file: null,
  });
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const res = await axios.get("http://localhost:3000/api/modules");
    setModules(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("moduleName", formData.moduleName);
    data.append("branch", formData.branch);
    data.append("semester", formData.semester);
    data.append("dateTime", new Date().toLocaleString());
    data.append("file", formData.file);

    await axios.post("http://localhost:3000/api/modules", data);
    fetchModules();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/modules/${id}`);
    fetchModules();
  };

  return (
    <div className="upload-module">
  <div className="upload-container">
    <form onSubmit={handleSubmit} className="module-form">
      <h2>Upload Module</h2>
      <input type="file" onChange={handleFileChange} required />
      <input type="text" name="moduleName" placeholder="Module Name" onChange={handleChange} required />
      <input type="text" name="branch" placeholder="Branch" onChange={handleChange} required />
      <input type="text" name="semester" placeholder="Semester" onChange={handleChange} required />
      <input type="text" value={new Date().toLocaleString()} readOnly />
      <button type="submit">Upload</button>
    </form>

    <div className="module-table-container">
      <h3>Uploaded Modules</h3>
      <table className="modules-table">
        <thead>
          <tr>
            <th>Module Name</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Date & Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((mod) => (
            <tr key={mod._id}>
              <td>{mod.moduleName}</td>
              <td>{mod.branch}</td>
              <td>{mod.semester}</td>
              <td>{mod.dateTime}</td>
              <td>
                <button onClick={() => handleDelete(mod._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default UploadModule;

