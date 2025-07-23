import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: { type: String, enum: ['manager', 'engineer'] },
  skills: [String],
  seniority: { type: String, enum: ['junior', 'mid', 'senior'] },
  maxCapacity: Number,
  department: String,
});

export const User = mongoose.model('User', userSchema);