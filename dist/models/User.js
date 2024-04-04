"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/models/User.ts
const db_1 = __importDefault(require("../config/db"));
class User {
    constructor({ id, name, email, google_user_id }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.google_user_id = google_user_id;
    }
    // Find a user by email
    static async findByEmail(email) {
        const [rows] = await db_1.default.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        const users = rows;
        return users.length > 0 ? new User(users[0]) : null;
    }
    // Save the user to the database
    async save() {
        if (this.id) {
            // Update existing user
            // Not implemented for brevity
        }
        else {
            // Insert new user
            const [result] = await db_1.default.promise().query('INSERT INTO users (name, email, google_user_id) VALUES (?, ?, ?)', [this.name, this.email, this.google_user_id]);
            const insertResult = result;
            this.id = insertResult.insertId;
        }
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map