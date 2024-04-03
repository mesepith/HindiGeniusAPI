// src/routes/chatRoutes.ts
import express from 'express';
import { sendMessage, fetchMessages } from '../controllers/chatController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/send', authenticate, sendMessage);
router.get('/:userId', authenticate, fetchMessages);

export default router;