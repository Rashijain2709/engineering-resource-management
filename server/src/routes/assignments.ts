import express from 'express';
import { Assignment } from '../models/Assignment';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
router.use(authMiddleware);

// Get all assignments
router.get('/', async (_req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

// Create new assignment
router.post('/', async (req, res) => {
  const assignment = new Assignment(req.body);
  await assignment.save();
  res.status(201).json(assignment);
});

// Update assignment
router.put('/:id', async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!assignment) return res.status(404).send('Assignment not found');
  res.json(assignment);
});

// Delete assignment
router.delete('/:id', async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;