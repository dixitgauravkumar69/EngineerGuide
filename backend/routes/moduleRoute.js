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
  const { moduleName, branch, semester, dateTime } = req.body;
  const newModule = new Module({
    moduleName,
    branch,
    semester,
    dateTime,
    filePath: req.file.path,
  });
  await newModule.save();
  res.send("Module uploaded");
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
