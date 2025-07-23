import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  engineerId: mongoose.Types.ObjectId,
  projectId: mongoose.Types.ObjectId,
  allocationPercentage: Number,
  startDate: Date,
  endDate: Date,
  role: String,
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);