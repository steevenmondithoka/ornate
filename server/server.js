require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const updateRoutes = require("./routes/updateRoutes");

const tshirtRoutes = require("./routes/tshirtRoutes");

const alumniRegistrations = require("./routes/alumniRegistrationRoutes");

const registrationRoutes = require('./routes/registrationRoutes');

const adminRoutes = require('./routes/adminRoutes'); 

const app = express();



// Connect to Database
connectDB();

// Middleware
const allowedOrigins = [
  "http://localhost:5173", // For local testing
  process.env.FRONTEND_URL  // For production
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS policy violation"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/stalls", require("./routes/stallRoutes"));
app.use("/api/updates", updateRoutes);
app.use("/api/tshirts", tshirtRoutes);
app.use("/api/alumni-registrations", alumniRegistrations);
app.use('/api/registrations', registrationRoutes);
app.use('/api/admins', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
