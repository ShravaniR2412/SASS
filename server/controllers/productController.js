import Product from '../models/product.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    
    const { productName, productDescription, productPrice, licenseNumber } = req.body;

    // Ensure all required fields are present
    if (!productName || !productDescription || !productPrice || !licenseNumber) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
   
    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      licenseNumber
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully!',
      product: newProduct
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all products
// Product controller
export const getProducts = async (req, res) => {
  try {
    const { licenseNumber } = req.body; // Extract licenseNumber from request body

    if (!licenseNumber) {
      return res.status(400).json({ message: 'License number is required.' });
    }

    // Fetch products matching the license number
    const products = await Product.find({ licenseNumber });
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};



// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    // Handle file uploads if necessary
    if (req.files) {
      updates.productPictures = req.files.map(file => file.path);
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};
