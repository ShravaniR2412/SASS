import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct,getAllProducts } from '../controllers/productController.js';

const router = express.Router();

// Route to create new products
router.post('/addproducts', createProduct);

// Route to get products by license number
router.post('/getproducts', getProducts);

// Route to get all products 
router.get('/getallproducts', getAllProducts);

// Route to get a single product by ID
router.get('/:id', getProductById);

// Route to update a product by ID
router.put('/:id', updateProduct);

// Delete product by ID
router.delete('/:id', deleteProduct);

export default router;


