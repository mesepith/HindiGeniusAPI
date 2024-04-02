"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWithGoogle = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
// Register a new user with Google authentication
const registerWithGoogle = async (req, res) => {
    try {
        const { name, email, google_user_id } = req.body;
        // Check if the user already exists
        const [rows] = await db_1.default.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        const existingUsers = rows;
        let userId;
        if (existingUsers.length > 0) {
            // User exists, use the existing user's ID
            userId = existingUsers[0].id;
        }
        else {
            // Create a new user
            const createUserQuery = 'INSERT INTO users (name, email, google_user_id) VALUES (?, ?, ?)';
            const [result] = await db_1.default.promise().query(createUserQuery, [name, email, google_user_id]);
            const insertResult = result;
            userId = insertResult.insertId; // Newly created user's ID
        }
        // Prepare the user object for the response
        const user = { id: userId, name, email, google_user_id };
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Return success response with the user and token
        return res.status(201).json({ success: true, user, token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.registerWithGoogle = registerWithGoogle;
//# sourceMappingURL=authController.js.map