import express, { Application } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes'; // Import chatRoutes
import errorMiddleware from './middleware/errorMiddleware';
import db from './config/db';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5029;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes); // Add chatRoutes

// Error middleware
app.use(errorMiddleware);

// Connect to MySQL and start the server
db.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
