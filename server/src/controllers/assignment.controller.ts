import { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';

export const getAllAssignments = async (_req: Request, res: Response) => {
  const assignments = await Assignment.find();
  res.json(assignments);
};

export const createAssignment = async (req: Request, res: Response) => {
  const assignment = new Assignment(req.body);
  await assignment.save();
  res.status(201).json(assignment);
};

export const updateAssignment = async (req: Request, res: Response) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!assignment) return res.status(404).send('Assignment not found');
  res.json(assignment);
};

export const deleteAssignment = async (req: Request, res: Response) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.status(204).send();
};