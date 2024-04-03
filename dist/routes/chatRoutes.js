"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/chatRoutes.ts
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/send', authMiddleware_1.authenticate, chatController_1.sendMessage);
router.get('/:userId', authMiddleware_1.authenticate, chatController_1.fetchMessages);
exports.default = router;
//# sourceMappingURL=chatRoutes.js.map