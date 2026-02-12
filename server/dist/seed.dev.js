"use strict";

require('dotenv').config();

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var Admin = require('./models/Admin');

var seedAdmin = function seedAdmin() {
  var email, password, existingAdmin, hashedPassword;
  return regeneratorRuntime.async(function seedAdmin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGO_URI));

        case 3:
          // Your details
          email = "nidadavolunandini@gmail.com";
          password = "Nandini@123"; // Check if the admin already exists

          _context.next = 7;
          return regeneratorRuntime.awrap(Admin.findOne({
            email: email
          }));

        case 7:
          existingAdmin = _context.sent;

          if (!existingAdmin) {
            _context.next = 15;
            break;
          }

          // If the admin exists but isn't a superadmin, update them
          existingAdmin.role = 'superadmin';
          _context.next = 12;
          return regeneratorRuntime.awrap(existingAdmin.save());

        case 12:
          console.log("Admin already existed. Updated to Super Admin role!");
          _context.next = 21;
          break;

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 17:
          hashedPassword = _context.sent;
          _context.next = 20;
          return regeneratorRuntime.awrap(Admin.create({
            name: "Main Admin",
            email: email,
            password: hashedPassword,
            role: "superadmin" // <--- THIS IS THE KEY CHANGE

          }));

        case 20:
          console.log("Super Admin created successfully!");

        case 21:
          console.log("Email:", email);
          console.log("Role: superadmin");
          process.exit();
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](0);
          console.error("Error seeding admin:", _context.t0);
          process.exit(1);

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 26]]);
};

seedAdmin();
//# sourceMappingURL=seed.dev.js.map
