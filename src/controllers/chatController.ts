import { Request, Response } from 'express';
import { Chat } from '../entity/Chat';
import { User } from '../entity/User';
import ChatService from '../services/ChatService';
import dataSource from '../app';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;
    const response = await ChatService.getMessageResponse(message);

    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: parseInt(userId, 10) });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const chatRepository = dataSource.getRepository(Chat);
    const chat = chatRepository.create({ user, message, response });
    await chatRepository.save(chat);

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const fetchMessages = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const chatRepository = dataSource.getRepository(Chat);

    const messages = await chatRepository.find({
      where: { user: { id: parseInt(userId, 10) } },
      relations: ['user'],
      order: { created_at: 'ASC' }
    });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
