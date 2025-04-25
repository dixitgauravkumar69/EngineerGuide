const express = require("express");
const router = express.Router();
const Course = require("../models/Modules"); // Assuming you have a model for courses
const moduleProgress = require("../models/moduleProgress");


// Update progress in the Dumy database

router.get('/courses/:courseId', async (req, res) => {
    const { courseId } = req.params;
    console.log(courseId);
    try {
      const course = await Course.findById(courseId);
     
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching course" });
    }
  });
  
router.post("/update-progress", async (req, res) => {
  const { courseId,  progressPercentage } = req.body;

  if (!courseId) {
    return res.status(400).json({ error: "Missing courseId or userId" });
  }

  try {
    // Validate that the user and course exist in MongoDB
   
    const courseExists = await Course.findById(courseId);

    if (!courseExists) {
      return res.status(404).json({ error: "User or Course not found" });
    }

    // Find or create progress entry
    let progressEntry = await Dumy.findOne({ Courseid: courseId});

    if (progressEntry) {
      // Update existing progress
      progressEntry.ProgressPer = progressPercentage;
      await progressEntry.save();
    } else {
      // Create a new progress entry
      progressEntry = new moduleProgress({
        Courseid: courseId,
        ProgressPer: progressPercentage,
      });
      await progressEntry.save();
    }

    res.json({ success: true, message: "Progress updated", progressEntry });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/get-progress/:courseId", async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(400).json({ error: "Missing courseId" });
  }

  try {
    // Fetch progress from the database
    const progressEntry = await moduleProgress.findOne({ Courseid: courseId });

    if (!progressEntry) {
      return res.json({ success: true, progressPercentage: 0 }); // Default to 0% if no progress found
    }

    res.json({ success: true, progressPercentage: progressEntry.ProgressPer });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
