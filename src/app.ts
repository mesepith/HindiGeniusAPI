import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
// import * as Logger from 'typeorm/logger/Logger'; // Use the import * as syntax
import { User } from './entity/User';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';
import errorMiddleware from './middleware/errorMiddleware';

// const logger = new Logger('default');

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/entity/**/*.js'],
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
  synchronize: process.env.NODE_ENV !== 'production',
  charset  : 'utf8mb4',
  // logger: logger,
});

dataSource
  .initialize()
  .then(() => {
    console.log('Database connection established');

    const app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
    app.use('/api/chats', chatRoutes);
    app.use(errorMiddleware);

    const port = process.env.PORT || 5029;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error('Database connection failed:', error));

export default dataSource;