const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/User"); 

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();

    await User.create([
      {
        name: "Employee One",
        email: "employee@deskflow.com",
        password: "password123",
        role: "employee",
      },
      {
        name: "Admin One",
        email: "admin@deskflow.com",
        password: "admin123",
        role: "admin",
      },
    ]);

    console.log("✅ Seed users created");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding users:", err.message);
    process.exit(1);
  }
};

seedUsers();

