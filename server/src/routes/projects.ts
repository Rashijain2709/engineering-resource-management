import express from 'express';
import { Project } from '../models/Project';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
router.use(authMiddleware);

// Get all projects
router.get('/', async (_req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Get one project
router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).send('Project not found');
  res.json(project);
});

// Create new project
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
});

export default router;