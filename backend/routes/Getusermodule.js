// routes/moduleRoutes.js
const express = require("express");
const router = express.Router();
const Modules = require("../models/Modules");

router.post("/UserModule", async (req, res) => {
    const { branch, semster } = req.body; // keep as it is
   
  console.log("Received query:", branch, semster);

  try {
    const modules = await Modules.find({ branch, semester: semster }); 
    console.log("Modules fetched:", modules); // Log the fetched modules
    res.status(200).json(modules);

  } catch (err) {
    res.status(500).json({ message: "Error fetching modules" });
  }
});

module.exports = router;
