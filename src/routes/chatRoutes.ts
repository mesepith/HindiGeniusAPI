// src/routes/chatRoutes.ts
import express from 'express';
import { sendMessage, fetchMessages, startNewChatSession } from '../controllers/chatController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/send', authenticate, sendMessage);
router.get('/:userId/:sessionId', authenticate, fetchMessages);

// New route for starting a new chat session
router.get('/start-new-session', authenticate, startNewChatSession);

export default router;