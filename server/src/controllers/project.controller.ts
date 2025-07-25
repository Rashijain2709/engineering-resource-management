import { Request, Response } from 'express';
import { Project } from '../models/Project';

export const getAllProjects = async (_req: Request, res: Response) => {
  const projects = await Project.find();
  res.json(projects);
};

export const getProjectById = async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send('Project not found');
  res.json(project);
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      requiredSkills,
      status,
      teamSize,
      managerId,
      startDate,
      endDate,
    } = req.body;

    if (!name || !description || !requiredSkills || !status || !teamSize || !managerId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const project = new Project({
      name,
      description,
      requiredSkills,
      status,
      teamSize,
      managerId,
      startDate,
      endDate,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err: any) {
    console.error('Failed to create project:', err.message);
    res.status(400).json({ message: 'Failed to create project', error: err.message });
  }
};
