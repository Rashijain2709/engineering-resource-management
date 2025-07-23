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
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
};