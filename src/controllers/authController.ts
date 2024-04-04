// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const registerWithGoogle = async (req: Request, res: Response) => {
    try {
        const { name, email, google_user_id } = req.body;

        let user = await User.findByEmail(email);

        if (!user) {
            user = new User({ name, email, google_user_id });
            await user.save();
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return res.status(201).json({ success: true, user, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
