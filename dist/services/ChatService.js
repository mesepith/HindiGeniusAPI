"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/ChatService.ts
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../db"));
dotenv_1.default.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log('OPENAI_API_KEY', OPENAI_API_KEY);
const ChatService = {
    getMessageResponse: async (message) => {
        try {
            console.log('message', message);
            const response = await axios_1.default.post('https://api.openai.com/v1/chat/completions', // Changed endpoint
            {
                model: 'gpt-3.5-turbo-0125', // Corrected model identifier
                messages: [
                    { role: "user", content: `Give your response in Hindi: ${message}` }
                ],
                temperature: 0.7, // Retained from your previous configuration
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            });
            // Adjusted to match the response structure of the Chat Completion endpoint
            const lastResponse = response.data.choices[0].message.content.trim();
            return lastResponse;
        }
        catch (error) {
            console.error('Error getting response from OpenAI:', error);
            throw error;
        }
    },
    storeMessage: async (userId, message, response) => {
        try {
            const query = 'INSERT INTO chats (user_id, message, response) VALUES (?, ?, ?)';
            await db_1.default.promise().query(query, [userId, message, response]);
        }
        catch (error) {
            console.error('Error storing message:', error);
            throw error;
        }
    },
    fetchMessages: async (userId) => {
        try {
            const [rows] = await db_1.default.promise().query('SELECT message, response FROM chats WHERE user_id = ?', [userId]);
            return rows;
        }
        catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    },
};
exports.default = ChatService;
//# sourceMappingURL=ChatService.js.map