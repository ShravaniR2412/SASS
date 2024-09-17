import express from 'express';
import {createProduct,getProducts } from '../controllers/productController.js';
// import { loginUser } from '../controllers/loginController.js';

const router = express.Router();


router.post('/addproducts', createProduct);
router.post('/getproducts', getProducts);



export default router;
