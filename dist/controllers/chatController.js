"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMessages = exports.sendMessage = void 0;
const ChatService_1 = __importDefault(require("../services/ChatService"));
const sendMessage = async (req, res) => {
    try {
        const { userId, message } = req.body;
        const response = await ChatService_1.default.getMessageResponse(message);
        await ChatService_1.default.storeMessage(userId, message, response);
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
        const messages = await ChatService_1.default.fetchMessages(parseInt(userId));
        res.status(200).json({ success: true, messages });
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.fetchMessages = fetchMessages;
//# sourceMappingURL=chatController.js.map