const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Ticket = require("./models/Ticket");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  // Clear old tickets
  await Ticket.deleteMany();

  // Find demo users
  const employee = await User.findOne({ email: "employee@deskflow.com" });
  const admin = await User.findOne({ email: "admin@deskflow.com" });

  // Insert sample tickets
  await Ticket.create([
    {
      title: "Laptop not booting",
      description: "My laptop fails to start after update.",
      status: "Open",
      priority: "High",
      user: employee._id,
      attachments: []
    },
    {
      title: "VPN connection issue",
      description: "Unable to connect to company VPN from home.",
      status: "In Progress",
      priority: "Medium",
      user: employee._id,
      attachments: []
    },
    {
      title: "Printer offline",
      description: "Office printer is not responding.",
      status: "Resolved",
      priority: "Low",
      user: admin._id, // seeded under admin for demo
      attachments: []
    }
  ]);

  console.log("Seed tickets created");
  process.exit();
});
