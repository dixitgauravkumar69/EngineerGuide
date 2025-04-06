import React, { useEffect, useState } from "react";
import "./Seestudent.css";

const Seestudents = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    branch: "",
    semster: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/admin/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      setNewUser({
        name: "",
        email: "",
        password: "",
        phone: "",
        branch: "",
        semster: "",
      });
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const name = user.name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || email.includes(term);
  });

  return (
    <div className="see-students">
      <h2>All Students</h2>

      <div className="top-controls">
        <input
          type="text"
          placeholder="Search by name/email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add New User"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddUser} className="add-user-form">
          <input type="text" placeholder="Name" required value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <input type="email" placeholder="Email" required value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <input type="password" placeholder="Password" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          <input type="text" placeholder="Mobile" required value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
          <input type="text" placeholder="Branch" required value={newUser.branch} onChange={(e) => setNewUser({ ...newUser, branch: e.target.value })} />
          <input type="text" placeholder="Semester" required value={newUser.semster} onChange={(e) => setNewUser({ ...newUser, semster: e.target.value })} />
          <button type="submit">Add User</button>
        </form>
      )}

      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Branch</th>
            <th>Semester</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.branch}</td>
                <td>{user.semster}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Seestudents;
