import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  status: { type: String, enum: ['planning', 'active', 'completed'], required: true },
  teamSize: { type: Number, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  managerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, // required
});

export const Project = mongoose.model('Project', projectSchema);
