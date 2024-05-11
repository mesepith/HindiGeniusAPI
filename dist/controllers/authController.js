"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.registerWithGoogle = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entity/User");
const data_source_1 = __importDefault(require("../data-source")); // Import the dataSource instance
const generateTokens = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5d' });
    return { accessToken, refreshToken };
};
const registerWithGoogle = async (req, res) => {
    try {
        const { name, email, google_user_id } = req.body;
        // console.log('email: ', email);
        const userRepository = data_source_1.default.getRepository(User_1.User);
        // Use createQueryBuilder to build the query
        const queryBuilder = userRepository.createQueryBuilder('users')
            .where('users.email = :email', { email });
        // Get the generated SQL query
        // const sql = queryBuilder.getSql();
        // Log the SQL query
        // console.log('Generated SQL:', sql);
        // Execute the query
        let user = await queryBuilder.getOne();
        // console.log('user: ', user);
        if (!user) {
            user = new User_1.User();
            user.name = name;
            user.email = email;
            user.google_user_id = google_user_id;
            await userRepository.save(user);
        }
        // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        const tokens = generateTokens(user.id);
        return res.status(201).json({ success: true, user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
        // return res.status(201).json({ success: true, user, token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.registerWithGoogle = registerWithGoogle;
const refreshToken = async (req, res) => {
    const { refreshToken, userId } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log('decoded ------------ ', decoded.userId);
        const newTokens = generateTokens(decoded.userId); // Ensure you're passing the actual userID
        console.log('new refresh Tokens ', newTokens);
        return res.json({ success: true, ...newTokens });
    }
    catch (error) {
        console.log('error refreshToken() 1: ', error);
        // More detailed error response based on the type of JWT error
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            console.log('error refreshToken() if: ');
            return res.status(401).json({ success: false, message: 'Token expired, please log in again' });
        }
        else {
            console.log('error refreshToken() else: ');
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }
    }
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=authController.js.map