import { Assignment } from '../models/Assignment';
import { User } from '../models/User';

export const getAvailableCapacity = async (engineerId: string) => {
  const engineer = await User.findById(engineerId);
  if (!engineer) throw new Error('Engineer not found');

  const activeAssignments = await Assignment.find({
    engineerId,
    endDate: { $gte: new Date() }
  });

  const totalAllocated = activeAssignments.reduce(
    (sum, a) => sum + (a.allocationPercentage ?? 0),
    0
  );

  return (engineer.maxCapacity ?? 0) - totalAllocated;
};

export const findSuitableEngineers = async (requiredSkills: string[]) => {
  const allEngineers = await User.find({ role: 'engineer' });
  return allEngineers.filter(engineer =>
    requiredSkills.some(skill => engineer.skills.includes(skill))
  );
};