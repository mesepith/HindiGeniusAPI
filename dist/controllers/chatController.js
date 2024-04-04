"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMessages = exports.sendMessage = void 0;
const Chat_1 = require("../entity/Chat");
const User_1 = require("../entity/User");
const ChatService_1 = __importDefault(require("../services/ChatService"));
const app_1 = __importDefault(require("../app"));
const sendMessage = async (req, res) => {
    try {
        const { userId, message } = req.body;
        const response = await ChatService_1.default.getMessageResponse(message);
        const userRepository = app_1.default.getRepository(User_1.User);
        const user = await userRepository.findOneBy({ id: parseInt(userId, 10) });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const chatRepository = app_1.default.getRepository(Chat_1.Chat);
        const chat = chatRepository.create({ user, message, response });
        await chatRepository.save(chat);
        res.status(200).json({ success: true, response });
    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.sendMessage = sendMessage;
const fetchMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const chatRepository = app_1.default.getRepository(Chat_1.Chat);
        const messages = await chatRepository.find({
            where: { user: { id: parseInt(userId, 10) } },
            relations: ['user'],
            order: { created_at: 'ASC' }
        });
        res.status(200).json({ success: true, messages });
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.fetchMessages = fetchMessages;
//# sourceMappingURL=chatController.js.map