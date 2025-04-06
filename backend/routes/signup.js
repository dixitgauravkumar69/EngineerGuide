const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/signup', async (req, res) => {
  const { name, email, password, mobile, branch, semester } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      phone: mobile,
      branch,
      semster: semester,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
