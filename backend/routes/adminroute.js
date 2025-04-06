const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const User = require("../models/users");

router.post("/signup", async (req, res) => {
  const {name,email, password,phone } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ name,email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ email, password });
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (err) {
    res.status(500).json({ message: "Error creating admin", error: err.message });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Admin login successful", admin });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
});


// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Add user
router.post("/users", async (req, res) => {
  const { name, email, password, phone, branch, semster } = req.body;
  const newUser = new User({ name, email, password, phone, branch, semster });
  await newUser.save();
  res.status(201).json({ message: "User added" });
});

module.exports = router;
