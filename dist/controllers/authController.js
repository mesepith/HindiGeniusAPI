"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWithGoogle = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const registerWithGoogle = async (req, res) => {
    try {
        const { name, email, google_user_id } = req.body;
        let user = await User_1.User.findByEmail(email);
        if (!user) {
            user = new User_1.User({ name, email, google_user_id });
            await user.save();
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ success: true, user, token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.registerWithGoogle = registerWithGoogle;
//# sourceMappingURL=authController.js.map