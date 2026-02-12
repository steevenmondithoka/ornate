require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Your details
    const email = "nidadavolunandini@gmail.com";
    const password = "Nandini@123"; 

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingAdmin) {
      // If the admin exists but isn't a superadmin, update them
      existingAdmin.role = 'superadmin';
      await existingAdmin.save();
      console.log("Admin already existed. Updated to Super Admin role!");
    } else {
      // Create a brand new Super Admin
      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.create({
        name: "Main Admin",
        email: email,
        password: hashedPassword,
        role: "superadmin" // <--- THIS IS THE KEY CHANGE
      });
      console.log("Super Admin created successfully!");
    }

    console.log("Email:", email);
    console.log("Role: superadmin");
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();