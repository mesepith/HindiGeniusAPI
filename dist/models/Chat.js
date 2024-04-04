"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
// src/models/Chat.ts
const db_1 = __importDefault(require("../config/db"));
class Chat {
    constructor({ id, user_id, message, response }) {
        this.id = id;
        this.user_id = user_id;
        this.message = message;
        this.response = response;
    }
    async save() {
        const query = 'INSERT INTO chats (user_id, message, response) VALUES (?, ?, ?)';
        const [result] = await db_1.default.promise().query(query, [this.user_id, this.message, this.response]);
        const insertResult = result;
        this.id = insertResult.insertId;
    }
    static async fetchMessages(userId) {
        const [rows] = await db_1.default.promise().query('SELECT * FROM chats WHERE user_id = ?', [userId]);
        return rows;
    }
}
exports.Chat = Chat;
//# sourceMappingURL=Chat.js.map