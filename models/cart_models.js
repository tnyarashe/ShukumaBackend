// Assuming you have the necessary dependencies and Mongoose connection established
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }]
  });
  
  // Define the Cart model
  const Cart = mongoose.model('cart', cartSchema);
  
  // Example functionality to add a product to the cart
  const addToCart = (userId, productId, quantity) => {
    // Find the cart for the user or create a new one if it doesn't exist
    Cart.findOne({ user: userId })
      .then(cart => {
        if (!cart) {
          cart = new Cart({ user: userId });
        }
  
        // Check if the product already exists in the cart
        const existingProduct = cart.products.find(product => product.productId.equals(productId));
  
        if (existingProduct) {
          // If the product already exists, update its quantity
          existingProduct.quantity += quantity;
        } else {
          // If the product doesn't exist, add it to the cart
          cart.products.push({ productId, quantity });
        }
  
        // Save the updated cart
        return cart.save();
      })
      .then(savedCart => {
        console.log('Product added to cart:', savedCart);
      })
      .catch(error => {
        console.error(error);
      });
};