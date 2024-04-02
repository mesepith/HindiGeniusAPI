import express from 'express';
import { registerWithGoogle } from '../controllers/authController';

const router = express.Router();

router.post('/register-google', registerWithGoogle);

export default router;