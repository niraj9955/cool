import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import seoRoutes from './routes/seoRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/seo', seoRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Data-Analogy API is running' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
