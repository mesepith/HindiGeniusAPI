import express from 'express';
import { registerWithGoogle, refreshToken } from '../controllers/authController';

const router = express.Router();

router.post('/register-google', registerWithGoogle);
router.post('/refresh-token', refreshToken);

export default router;