// src/models/User.ts
import db from '../config/db';
import mysql from 'mysql2';

export interface IUser {
    id?: number; // id might be undefined when creating a new user
    name: string;
    email: string;
    google_user_id?: string;
}

export class User {
    public id?: number;
    public name: string;
    public email: string;
    public google_user_id?: string;

    constructor({ id, name, email, google_user_id }: IUser) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.google_user_id = google_user_id;
    }

    // Find a user by email
    static async findByEmail(email: string): Promise<User | null> {
        const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        const users = rows as IUser[];
        return users.length > 0 ? new User(users[0]) : null;
    }

    // Save the user to the database
    async save(): Promise<void> {
        if (this.id) {
            // Update existing user
            // Not implemented for brevity
        } else {
            // Insert new user
            const [result] = await db.promise().query(
                'INSERT INTO users (name, email, google_user_id) VALUES (?, ?, ?)',
                [this.name, this.email, this.google_user_id]
            );
            const insertResult = result as mysql.OkPacket;
            this.id = insertResult.insertId;
        }
    }
}
