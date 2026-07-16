const express = require("express");
const Ticket = require("../models/Ticket");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

// Configure Multer to store files in "uploads/"
const upload = multer({ dest: "uploads/" });

// Create new ticket (employee)
router.post("/", protect, upload.array("attachments"), async (req, res) => {
  try {
    const ticket = new Ticket({
      title: req.body.title,
      description: req.body.description,
      status: "Open",
      priority: req.body.priority || "Medium",
      user: req.user._id,
      attachments: req.files.map((file) => file.path),
    });

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: "Error creating ticket", error: err.message });
  }
});

// Get tickets for logged-in employee
router.get("/my", protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ message: "Error fetching tickets", error: err.message });
  }
});

// ✅ Get ticket stats for logged-in employee
router.get("/stats", protect, async (req, res) => {
  try {
    const stats = await Ticket.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const formatted = { open: 0, inProgress: 0, resolved: 0 };
    stats.forEach((s) => {
      if (s._id === "Open") formatted.open = s.count;
      if (s._id === "In Progress") formatted.inProgress = s.count;
      if (s._id === "Resolved") formatted.resolved = s.count;
    });

    res.json(formatted);
  } catch (err) {
    res.status(400).json({ message: "Error fetching stats", error: err.message });
  }
});

// Get all tickets (admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ message: "Error fetching tickets", error: err.message });
  }
});

// Update ticket status (admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = req.body.status || ticket.status;
    await ticket.save();

    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: "Error updating ticket", error: err.message });
  }
});

module.exports = router;





