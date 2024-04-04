// src/models/Chat.ts
import db from '../config/db';

export interface IChat {
    id?: number;
    user_id: number;
    message: string;
    response: string;
}

export class Chat {
    public id?: number;
    public user_id: number;
    public message: string;
    public response: string;

    constructor({ id, user_id, message, response }: IChat) {
        this.id = id;
        this.user_id = user_id;
        this.message = message;
        this.response = response;
    }

    async save(): Promise<void> {
        const query = 'INSERT INTO chats (user_id, message, response) VALUES (?, ?, ?)';
        const [result] = await db.promise().query(query, [this.user_id, this.message, this.response]);
        const insertResult = result as mysql.OkPacket;
        this.id = insertResult.insertId;
    }

    static async fetchMessages(userId: number): Promise<IChat[]> {
        const [rows] = await db.promise().query('SELECT * FROM chats WHERE user_id = ?', [userId]);
        return rows as IChat[];
    }
}
