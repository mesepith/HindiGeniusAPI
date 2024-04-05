// src/services/ChatService.ts
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const ChatService = {
  getMessageResponse: async (message: string): Promise<string> => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-0125',
          messages: [{ role: "user", content: `${message}, write answer in hindi` }],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      // Extract the response from OpenAI
      const lastResponse = response.data.choices[0].message.content.trim();
      return lastResponse;
    } catch (error) {
      console.error('Error getting response from OpenAI:', error);
      throw error;
    }
  },
};

export default ChatService;
