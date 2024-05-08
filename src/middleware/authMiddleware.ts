// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log('Authorization header missing by Zahir ');
    return res.status(401).json({ success: false, message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('error inside authenticate() ', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};