// src/services/ChatService.ts
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const ChatService = {
  getMessageResponse: async (messages: Array<{role: string, content: string}>): Promise<any> => {
    try {
      
      messages.push({role: "system", content: "The following responses should be in Hindi."});

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-0125',
          messages: messages,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      // Extract the text response
      const textResponse = response.data.choices[0].message.content.trim();

      // Extract individual token metrics directly
      const promptTokens = response.data.usage.prompt_tokens;
      const completionTokens = response.data.usage.completion_tokens;
      const totalTokens = response.data.usage.total_tokens;

      // Return the text response and individual token metrics
      return { 
        textResponse, 
        promptTokens, 
        completionTokens, 
        totalTokens 
      };
    } catch (error) {
      console.error('Error getting response from OpenAI:', error);
      throw error;
    }
  },
};

export default ChatService;
