"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
// const logger = new Logger('default');
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/entity/**/*.js'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    synchronize: process.env.NODE_ENV !== 'production',
    // logger: logger,
});
dataSource
    .initialize()
    .then(() => {
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
})
    .catch((error) => console.error('Database connection failed:', error));
exports.default = dataSource;
//# sourceMappingURL=app.js.map