const mongoose = require("mongoose");

const PSchema = new mongoose.Schema({
  Courseid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Modules",
    required: true,
  },
  ProgressPer: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("moduleProgress", PSchema);
