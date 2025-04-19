// routes/moduleRoutes.js
const express = require("express");
const multer = require("multer");
const Module = require("../models/Modules");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/modules", upload.single("file"), async (req, res) => {
  try {
    const { moduleName, branch, semester, dateTime } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    const newModule = new Module({
      moduleName,
      branch,
      semester,
      dateTime,
      fileUrl, // ✅ Save proper file URL
    });

    await newModule.save();
    res.status(200).json({ message: "Module uploaded", module: newModule });
  } catch (error) {
    console.error("Error uploading module:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/modules", async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
});

router.delete("/modules/:id", async (req, res) => {
  await Module.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;
