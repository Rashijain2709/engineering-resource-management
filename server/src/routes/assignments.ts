import express from "express";
import { Assignment } from "../models/Assignment";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();
router.use(authMiddleware);

// Get all assignments
router.get("/", async (_req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("engineerId", "name")
      .populate("projectId", "name");
    res.json(assignments);
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
});

// Create new assignment
router.post("/", async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    console.error("Failed to create assignment:", err);
    res.status(400).json({ message: "Failed to create assignment" });
  }
});

// Update assignment
router.put("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!assignment) return res.status(404).send("Assignment not found");
    res.json(assignment);
  } catch (err) {
    console.error("Failed to update assignment:", err);
    res.status(400).json({ message: "Failed to update assignment" });
  }
});

// Delete assignment
router.delete("/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("Failed to delete assignment:", err);
    res.status(400).json({ message: "Failed to delete assignment" });
  }
});

export default router;
