import { Request, Response } from 'express';
import { User } from '../models/User';
import { Assignment } from '../models/Assignment';

export const getAllEngineers = async (_req: Request, res: Response) => {
  const engineers = await User.find({ role: 'engineer' });
  res.json(engineers);
};

export const getEngineerCapacity = async (req: Request, res: Response) => {
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
};