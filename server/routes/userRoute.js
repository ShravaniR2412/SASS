import express from 'express';
import { registerUser,getUserProfile } from '../controllers/userControllers.js';
import { loginUser } from '../controllers/loginController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Route to handle user registration
router.post('/register', registerUser);

// Route to handle user login
router.post('/login', loginUser);

router.get('/profile', auth, getUserProfile); 

export default router;
