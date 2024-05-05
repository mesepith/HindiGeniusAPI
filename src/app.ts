import express from 'express';
import dataSource from './data-source';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';
import errorMiddleware from './middleware/errorMiddleware';

dataSource.initialize().then(() => {
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
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});
