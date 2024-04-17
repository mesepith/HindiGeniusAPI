"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/ChatService.ts
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ChatService = {
    getMessageResponse: async (messages) => {
        try {
            messages.push({ role: "system", content: "The following responses should be in Hindi. If someone asks any abusive,explicit question or asks you to write abusive, explicit langugage then simply refuse to answer. " });
            const response = await axios_1.default.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo-0125',
                messages: messages,
                temperature: 0.7,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            });
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
        }
        catch (error) {
            console.error('Error getting response from OpenAI:', error);
            throw error;
        }
    },
};
exports.default = ChatService;
//# sourceMappingURL=ChatService.js.map