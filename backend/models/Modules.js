// models/Module.js
const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  moduleName: String,
  branch: String,
  semester: String,
  dateTime: String,
  filePath: String,
});

module.exports = mongoose.model("Module", moduleSchema);
