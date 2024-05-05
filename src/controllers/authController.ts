import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import dataSource from '../data-source'; // Import the dataSource instance

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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return res.status(201).json({ success: true, user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};