import { Request, Response } from 'express';
import { Chat } from '../entity/Chat';
import { User } from '../entity/User';
import ChatService from '../services/ChatService';
import { calculateAPICost } from '../utils/calculateAPICost';
import dataSource from '../app';
import { v4 as uuidv4 } from 'uuid';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { userId, sessionId, message } = req.body;
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: parseInt(userId, 10) });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fetch previous messages and responses in the same session
    const chatRepository = dataSource.getRepository(Chat);
    const previousMessages = await chatRepository.find({
      where: { user: user, sessionId: sessionId },
      order: { created_at: 'ASC' }
    });

    // Prepare message history for AI processing including AI's responses
    const messagesForAI = previousMessages.reduce((acc, msg) => {
      acc.push({ role: "user", content: msg.message });
      if (msg.response) {  // Ensure there is a response before adding to history
        acc.push({ role: "assistant", content: msg.response });
      }
      return acc;
    }, []);

    messagesForAI.push({ role: "user", content: message }); // Add current message to the end

    // Get AI response considering all previous messages and responses
    const result = await ChatService.getMessageResponse(messagesForAI);
    const { textResponse, promptTokens, completionTokens, totalTokens } = result;
    const aiModel = 'gpt-3.5-turbo-0125';
    const costDetails = calculateAPICost(aiModel, promptTokens, completionTokens);

    // Save the new chat message and AI response
    //const chat = chatRepository.create({ user, message, response, sessionId });
    const chat = chatRepository.create({
      user,
      sessionId,
      message,
      response: textResponse,
      promptTokens: promptTokens,
      completionTokens: completionTokens,
      totalTokens: totalTokens,
      serviceBy: 'OpenAI',
      aiModel: aiModel,
      totalInputCost: parseFloat(costDetails.totalInputCost),
      totalOutputCost: parseFloat(costDetails.totalOutputCost),
      totalCost: parseFloat(costDetails.totalCost),
    });

    await chatRepository.save(chat);

    res.status(200).json({ success: true, response: textResponse, sessionId });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const fetchMessages = async (req: Request, res: Response) => {
  try {
    const { userId, sessionId } = req.params;
    const chatRepository = dataSource.getRepository(Chat);

    const messages = await chatRepository.find({
      where: { user: { id: parseInt(userId, 10) }, sessionId },
      relations: ['user'],
      order: { created_at: 'ASC' }
    });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const startNewChatSession = async (req: Request, res: Response) => {
  try {
      const sessionId = uuidv4();  // Generate a unique session ID using uuid
      console.log('sessionId:::::::', sessionId);
      // You might want to store this sessionId in the database associated with the user or chat
      // For example, if you are keeping track of sessions in your database:
      // const chatRepository = dataSource.getRepository(Chat);
      // const newChatSession = chatRepository.create({ sessionId, user: req.user });
      // await chatRepository.save(newChatSession);
      res.status(200).json({ sessionId });
  } catch (error) {
      console.error('Error starting new chat session in node js:', error);
      res.status(500).json({ message: 'Internal server error', error });
  }
};
