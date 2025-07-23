import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  requiredSkills: [String],
  teamSize: Number,
  status: { type: String, enum: ['planning', 'active', 'completed'] },
  managerId: mongoose.Types.ObjectId,
});

export const Project = mongoose.model('Project', projectSchema);