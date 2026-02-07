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
// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL, // Make sure this is "https://ornate-iota.vercel.app" in Render
    methods: ["GET", "POST", "PUT", "DELETE","PATCH" ,"OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // <--- MUST ALLOW AUTHORIZATION
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
