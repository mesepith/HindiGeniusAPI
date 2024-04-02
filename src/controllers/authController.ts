import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db';
import mysql from 'mysql2';

// Register a new user with Google authentication
export const registerWithGoogle = async (req: Request, res: Response) => {
  try {
    const { name, email, google_user_id } = req.body;

    // Check if the user already exists
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    const existingUsers = rows as mysql.RowDataPacket[];

    let userId;

    if (existingUsers.length > 0) {
      // User exists, use the existing user's ID
      userId = existingUsers[0].id;
    } else {
      // Create a new user
      const createUserQuery = 'INSERT INTO users (name, email, google_user_id) VALUES (?, ?, ?)';
      const [result] = await db.promise().query(createUserQuery, [name, email, google_user_id]);
      const insertResult = result as mysql.OkPacket;
      userId = insertResult.insertId; // Newly created user's ID
    }

    // Prepare the user object for the response
    const user = { id: userId, name, email, google_user_id };

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Return success response with the user and token
    return res.status(201).json({ success: true, user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
