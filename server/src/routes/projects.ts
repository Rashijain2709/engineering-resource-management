import express from 'express';
import { Project } from '../models/Project';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
router.use(authMiddleware);

// GET all projects
router.get('/', async (_req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    res.status(500).json({ message: 'Server error while fetching projects' });
  }
});

// GET one project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(400).json({ message: 'Invalid project ID' });
  }
});

// POST create new project
router.post('/', async (req, res) => {
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
});

// PATCH update a project
router.patch('/:id', async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (err: any) {
    console.error('Failed to update project:', err.message);
    res.status(400).json({ message: 'Failed to update project', error: err.message });
  }
});

export default router;
