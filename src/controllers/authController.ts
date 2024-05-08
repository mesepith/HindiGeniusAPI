import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import dataSource from '../data-source'; // Import the dataSource instance

const generateTokens = (userId: number) => {
  const accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET!, { expiresIn: '1m' });
  const refreshToken = jwt.sign({ userId: userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '5m' });
  return { accessToken, refreshToken };
};


export const registerWithGoogle = async (req: Request, res: Response) => {
    
  try {
    
    const { name, email, google_user_id } = req.body;
    // console.log('email: ', email);
    const userRepository = dataSource.getRepository(User);

     // Use createQueryBuilder to build the query
     const queryBuilder = userRepository.createQueryBuilder('users')
     .where('users.email = :email', { email });

    // Get the generated SQL query
    // const sql = queryBuilder.getSql();

    // Log the SQL query
    // console.log('Generated SQL:', sql);

    // Execute the query
    let user = await queryBuilder.getOne();

    // console.log('user: ', user);

    if (!user) {
      user = new User();
      user.name = name;
      user.email = email;
      user.google_user_id = google_user_id;
      await userRepository.save(user);
    }

    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    const tokens = generateTokens(user.id);

    return res.status(201).json({ success: true, user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });

    // return res.status(201).json({ success: true, user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken, userId } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log('decoded ------------ ', decoded.userId);
    const newTokens = generateTokens(decoded.userId); // Ensure you're passing the actual userID
    console.log('new refresh Tokens ', newTokens);
    return res.json({ success: true, ...newTokens });
  } catch (error) {
    console.log('error refreshToken() 1: ', error);
    // More detailed error response based on the type of JWT error
    if (error instanceof jwt.TokenExpiredError) {
      console.log('error refreshToken() if: ');
      return res.status(401).json({ success: false, message: 'Token expired, please log in again' });
    } else {
      console.log('error refreshToken() else: ');
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
  }
};