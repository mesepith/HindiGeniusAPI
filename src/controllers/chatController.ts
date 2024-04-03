// src/controllers/chatController.ts
import { Request, Response } from 'express';
import ChatService from '../services/ChatService';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;

    const response = await ChatService.getMessageResponse(message);
    await ChatService.storeMessage(userId, message, response);

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const fetchMessages = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const messages = await ChatService.fetchMessages(parseInt(userId));

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};