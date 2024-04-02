"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5029;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
// Error middleware
app.use(errorMiddleware_1.default);
// Connect to MySQL and start the server
db_1.default.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
//# sourceMappingURL=app.js.map