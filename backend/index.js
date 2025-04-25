const express = require('express');
const path= require('path');
const mongoose = require('mongoose');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const adminRoute = require('./routes/adminroute');
const ModuleRoute = require('./routes/moduleRoute');
const GetusermoduleRoute = require('./routes/Getusermodule');
const ModuleProgressRoute = require('./routes/Progress');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Very important
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/EngineeringGuide")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes

app.use('/user', signupRoute);
app.use('/user', loginRoute);
app.use('/admin', adminRoute);
app.use('/api', ModuleRoute);
app.use('/api', GetusermoduleRoute);
app.use('/api', ModuleProgressRoute);

app.get("/",(req,res)=>
{
  res.send("I am Backend of Engineering Guide and now i am ready to serve you.....GD.");
})
// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
