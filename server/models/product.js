import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  productPrice: {
    type: String,
    required: true
  },
  productPictures: {
    type: [String], // Array of strings to store multiple image URLs
    required: false
  },
  licenseNumber: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
