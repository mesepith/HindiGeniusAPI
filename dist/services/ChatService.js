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
    getMessageResponse: async (message) => {
        try {
            const response = await axios_1.default.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo-0125',
                messages: [{ role: "user", content: `${message}, write answer in hindi` }],
                temperature: 0.7,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            });
            // Extract the response from OpenAI
            const lastResponse = response.data.choices[0].message.content.trim();
            return lastResponse;
        }
        catch (error) {
            console.error('Error getting response from OpenAI:', error);
            throw error;
        }
    },
};
exports.default = ChatService;
//# sourceMappingURL=ChatService.js.map