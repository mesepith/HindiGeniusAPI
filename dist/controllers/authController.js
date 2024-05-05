"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWithGoogle = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entity/User");
const data_source_1 = __importDefault(require("../data-source")); // Import the dataSource instance
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