import express from 'express';
import { User } from '../models/User';
import { Assignment } from '../models/Assignment';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
router.use(authMiddleware);

// Get all engineers
router.get('/', async (req, res) => {
  const engineers = await User.find({ role: 'engineer' });
  res.json(engineers);
});

// Get engineer capacity
router.get('/:id/capacity', async (req, res) => {
  const engineer = await User.findById(req.params.id);
  if (!engineer) return res.status(404).send('Engineer not found');
  
  const activeAssignments = await Assignment.find({
    engineerId: engineer._id,
    endDate: { $gte: new Date() }
  });

  const totalAllocated = activeAssignments.reduce(
    (sum, a) => sum + (a.allocationPercentage ?? 0),
    0
  );

  const available = (engineer.maxCapacity ?? 0) - totalAllocated;
  res.json({ allocated: totalAllocated, available });
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedEngineer = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEngineer) {
      return res.status(404).json({ message: 'Engineer not found' });
    }

    res.json(updatedEngineer);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to update engineer profile' });
  }
});

export default router;
