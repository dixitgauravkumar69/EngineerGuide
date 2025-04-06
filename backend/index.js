const express = require('express');
const mongoose = require('mongoose');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const adminRoute = require('./routes/adminroute');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Very important

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/EngineeringGuide")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes

app.use('/user', signupRoute);
app.use('/user', loginRoute);
app.use('/admin', adminRoute);
// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
