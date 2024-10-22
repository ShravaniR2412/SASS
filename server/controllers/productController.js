import Product from '../models/product.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    // Expecting an array of products in the request body
    const products = req.body.products;

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: 'No products provided',
      });
    }

    // Create an array to hold the saved products
    const savedProducts = [];

    // Iterate over each product and save it to the database
    for (const product of products) {
      const { productName, description, price, imageUrl, licenseNumber, category, salonName } = product;

      // Ensure all required fields are present
      if (!productName || !description || !price || !licenseNumber || !imageUrl || !category || !salonName) {
        return res.status(400).json({ message: 'All fields are required for each product.' });
      }

      // Create a new product object
      const newProduct = new Product({
        productName,
        description,
        price,
        imageUrl,
        licenseNumber,
        category,
        salonName, // Include salonName
      });

      // Save the product to the database
      const savedProduct = await newProduct.save();
      savedProducts.push(savedProduct); // Add each saved product to the array
    }

    return res.status(201).json({
      message: 'Products created successfully',
      data: savedProducts,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Error creating products',
      error: error.message,
    });
  }
};

// Get all products by license number
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
      error: error.message,
    });
  }
};

// Get all products irrespective of license number
export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find(); 

    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
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
      error: error.message,
    });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
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
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
