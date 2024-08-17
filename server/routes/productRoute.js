import express from 'express';
import {createProduct } from '../controllers/productController.js';
// import { loginUser } from '../controllers/loginController.js';

const router = express.Router();

// Route to handle user registration
router.post('/addproducts', createProduct);



export default router;
