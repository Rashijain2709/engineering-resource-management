import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { Assignment } from '../models/Assignment';
import bcrypt from 'bcryptjs';

dotenv.config();
mongoose.connect(process.env.MONGO_URI!);

async function seed() {
  await User.deleteMany({});
  await Project.deleteMany({});
  await Assignment.deleteMany({});

  const engineers = await User.insertMany([
    {
      email: 'alice@example.com',
      name: 'Alice',
      password: bcrypt.hashSync('password', 10),
      role: 'engineer',
      skills: ['React', 'Node.js'],
      seniority: 'mid',
      maxCapacity: 100,
      department: 'Frontend'
    },
    {
      email: 'bob@example.com',
      name: 'Bob',
      password: bcrypt.hashSync('password', 10),
      role: 'engineer',
      skills: ['Python', 'Node.js'],
      seniority: 'senior',
      maxCapacity: 50,
      department: 'Backend'
    },
    {
      email: 'carol@example.com',
      name: 'Carol',
      password: bcrypt.hashSync('password', 10),
      role: 'engineer',
      skills: ['React', 'Python'],
      seniority: 'junior',
      maxCapacity: 100,
      department: 'Frontend'
    },
    {
      email: 'manager@example.com',
      name: 'Manager Mike',
      password: bcrypt.hashSync('password', 10),
      role: 'manager'
    }
  ]);

  const projects = await Project.insertMany([
    {
      name: 'Inventory App',
      description: 'Build internal tool',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      requiredSkills: ['React', 'Node.js'],
      teamSize: 3,
      status: 'active',
      managerId: engineers[3]._id
    },
    {
      name: 'ML Insights',
      description: 'Analyze data with ML',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      requiredSkills: ['Python'],
      teamSize: 2,
      status: 'planning',
      managerId: engineers[3]._id
    }
  ]);

  await Assignment.insertMany([
    {
      engineerId: engineers[0]._id,
      projectId: projects[0]._id,
      allocationPercentage: 60,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      role: 'Developer'
    },
    {
      engineerId: engineers[1]._id,
      projectId: projects[1]._id,
      allocationPercentage: 50,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
      role: 'Tech Lead'
    }
  ]);

  console.log('Seed data inserted');
  process.exit();
}

seed().catch(console.error);