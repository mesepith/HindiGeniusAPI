"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNewChatSession = exports.fetchMessages = exports.sendMessage = void 0;
const Chat_1 = require("../entity/Chat");
const User_1 = require("../entity/User");
const ChatService_1 = __importDefault(require("../services/ChatService"));
const calculateAPICost_1 = require("../utils/calculateAPICost");
const app_1 = __importDefault(require("../app"));
const uuid_1 = require("uuid");
const sendMessage = async (req, res) => {
    try {
        const { userId, sessionId, message } = req.body;
        const userRepository = app_1.default.getRepository(User_1.User);
        const user = await userRepository.findOneBy({ id: parseInt(userId, 10) });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        // Fetch previous messages and responses in the same session
        const chatRepository = app_1.default.getRepository(Chat_1.Chat);
        const previousMessages = await chatRepository.find({
            where: { user: user, sessionId: sessionId },
            order: { created_at: 'ASC' }
        });
        // Prepare message history for AI processing including AI's responses
        const messagesForAI = previousMessages.reduce((acc, msg) => {
            acc.push({ role: "user", content: msg.message });
            if (msg.response) { // Ensure there is a response before adding to history
                acc.push({ role: "assistant", content: msg.response });
            }
            return acc;
        }, []);
        messagesForAI.push({ role: "user", content: message }); // Add current message to the end
        // Get AI response considering all previous messages and responses
        const result = await ChatService_1.default.getMessageResponse(messagesForAI);
        const { textResponse, promptTokens, completionTokens, totalTokens } = result;
        const aiModel = 'gpt-3.5-turbo-0125';
        const costDetails = (0, calculateAPICost_1.calculateAPICost)(aiModel, promptTokens, completionTokens);
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
    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.sendMessage = sendMessage;
const fetchMessages = async (req, res) => {
    try {
        const { userId, sessionId } = req.params;
        const chatRepository = app_1.default.getRepository(Chat_1.Chat);
        const messages = await chatRepository.find({
            where: { user: { id: parseInt(userId, 10) }, sessionId },
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
const startNewChatSession = async (req, res) => {
    try {
        const sessionId = (0, uuid_1.v4)(); // Generate a unique session ID using uuid
        console.log('sessionId:::::::', sessionId);
        // You might want to store this sessionId in the database associated with the user or chat
        // For example, if you are keeping track of sessions in your database:
        // const chatRepository = dataSource.getRepository(Chat);
        // const newChatSession = chatRepository.create({ sessionId, user: req.user });
        // await chatRepository.save(newChatSession);
        res.status(200).json({ sessionId });
    }
    catch (error) {
        console.error('Error starting new chat session in node js:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
exports.startNewChatSession = startNewChatSession;
//# sourceMappingURL=chatController.js.map