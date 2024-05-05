"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = __importDefault(require("./data-source"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
data_source_1.default.initialize().then(() => {
    console.log('Database connection established');
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/api/auth', authRoutes_1.default);
    app.use('/api/chats', chatRoutes_1.default);
    app.use(errorMiddleware_1.default);
    const port = process.env.PORT || 5029;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});
//# sourceMappingURL=app.js.map