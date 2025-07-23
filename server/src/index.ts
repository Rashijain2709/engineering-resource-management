import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth';
import engineerRoutes from './routes/engineers';
import projectRoutes from './routes/projects';
import assignmentRoutes from './routes/assignments';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/engineers', engineerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/assignments', assignmentRoutes);

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));