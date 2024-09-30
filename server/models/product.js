import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
