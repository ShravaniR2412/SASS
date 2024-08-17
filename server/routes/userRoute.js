import express from 'express';
import { registerUser } from '../controllers/userControllers.js';
import { loginUser } from '../controllers/loginController.js';

const router = express.Router();

// Route to handle user registration
router.post('/register', registerUser);

// Route to handle user login
router.post('/login', loginUser);

export default router;
