const express = require("express");
const Ticket = require("../models/Ticket");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

// Configure Multer to store files in "uploads/"
const upload = multer({ dest: "uploads/" });

// ✅ Create new ticket (employee)
router.post("/", protect, upload.array("attachments"), async (req, res) => {
  try {
    const ticket = new Ticket({
      title: req.body.title,
      description: req.body.description,
      status: "Open", // default on creation
      priority: req.body.priority || "Medium", // default Medium
      user: req.user._id,
      attachments: req.files ? req.files.map((file) => file.path) : [],
    });

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: "Error creating ticket", error: err.message });
  }
});

// ✅ Get tickets for logged-in employee
router.get("/my", protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ message: "Error fetching tickets", error: err.message });
  }
});

// ✅ Get ticket stats for logged-in employee (status + priority)
router.get("/stats", protect, async (req, res) => {
  try {
    const statusStats = await Ticket.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const priorityStats = await Ticket.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    const formatted = {
      open: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0,
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };

    statusStats.forEach((s) => {
      if (s._id === "Open") formatted.open = s.count;
      if (s._id === "In Progress") formatted.inProgress = s.count;
      if (s._id === "Resolved") formatted.resolved = s.count;
      if (s._id === "Closed") formatted.closed = s.count;
    });

    priorityStats.forEach((p) => {
      if (p._id === "Low") formatted.low = p.count;
      if (p._id === "Medium") formatted.medium = p.count;
      if (p._id === "High") formatted.high = p.count;
      if (p._id === "Critical") formatted.critical = p.count;
    });

    res.json(formatted);
  } catch (err) {
    res.status(400).json({ message: "Error fetching stats", error: err.message });
  }
});

// ✅ Admin-only global stats (status + priority across all users)
router.get("/stats/all", protect, adminOnly, async (req, res) => {
  try {
    const statusStats = await Ticket.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const priorityStats = await Ticket.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    const formatted = {
      open: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0,
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };

    statusStats.forEach((s) => {
      if (s._id === "Open") formatted.open = s.count;
      if (s._id === "In Progress") formatted.inProgress = s.count;
      if (s._id === "Resolved") formatted.resolved = s.count;
      if (s._id === "Closed") formatted.closed = s.count;
    });

    priorityStats.forEach((p) => {
      if (p._id === "Low") formatted.low = p.count;
      if (p._id === "Medium") formatted.medium = p.count;
      if (p._id === "High") formatted.high = p.count;
      if (p._id === "Critical") formatted.critical = p.count;
    });

    res.json(formatted);
  } catch (err) {
    res.status(400).json({ message: "Error fetching global stats", error: err.message });
  }
});

// ✅ Ticket creation trend (employee or admin) grouped by status
router.get("/stats/trend", protect, async (req, res) => {
  try {
    const matchCondition = req.user.isAdmin ? {} : { user: req.user._id };

    const trendStats = await Ticket.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    // Format: { "2026-07-15": { Open: 3, Resolved: 1, Closed: 0, In Progress: 2 }, ... }
    const formatted = {};
    trendStats.forEach((entry) => {
      const date = entry._id.date;
      const status = entry._id.status;
      if (!formatted[date]) {
        formatted[date] = { Open: 0, "In Progress": 0, Resolved: 0, Closed: 0 };
      }
      formatted[date][status] = entry.count;
    });

    res.json(formatted);
  } catch (err) {
    res.status(400).json({ message: "Error fetching trend stats", error: err.message });
  }
});

// ✅ Get all tickets (admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(400).json({ message: "Error fetching tickets", error: err.message });
  }
});

// ✅ Update ticket status (admin only)
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = req.body.status || ticket.status;
    await ticket.save();

    res.json({ status: ticket.status });
  } catch (err) {
    res.status(400).json({ message: "Error updating status", error: err.message });
  }
});

// ✅ Update ticket priority (admin only)
router.put("/:id/priority", protect, adminOnly, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.priority = req.body.priority || ticket.priority;
    await ticket.save();

    res.json({ priority: ticket.priority });
  } catch (err) {
    res.status(400).json({ message: "Error updating priority", error: err.message });
  }
});

module.exports = router;











