const express = require("express");
const router = express.Router();
const User = require("../models/users");


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      // Note: No password hashing here yet
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      res.status(200).json({ message: "Login successful", user });
    } catch (err) {
      console.error("Login Error:", err.message);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  
  module.exports = router;