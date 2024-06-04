import { findById } from '../models/order_model';

const cart = require('../models/cart_models')
const user = require('../models/user_model')


// add items to cart
const addToCart = async (req,res) => {
try{
   const { productId, quantity } = req.body;
   const userId = req.user._id; // Assuming you have the authenticated user stored in req.user

   // Retrieve the user from the database
   const user = await findById(userId);

   if(!user){
    return res.status(404).json({ error: 'user not found' })
   }

   // Check if the product exists
   const product = await findById(productId);

   if(!product){
    return res.status(404).json({ error: 'product not found' })
   }


// create a new cart item
const cartItem = {
    product: productId,
    quantity: quantity || 1
};

// Add the cart item to the users cart
user.cart.push(cartItem);

await user.save();

res.json({ message: 'product added to cart successfully'});
} catch (error) {
 console.error(error);
 res.status(500).json({ message: 'Internal server error'});
} 
}; 

// fetch user cart data
const getCart = async (req,res) => {
try{
  const userId = req.user._id; // Assuming you have the authenticated user stored in req.user

  const user = await User.findById(userId).populate('cart.product');

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const cartItems = user.cart;

  res.json({ cart: cartItems });
} catch (error){
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
}

// remove items from cart
const removeFromCart = async (req,res) => {
try{
 const userId = req.user._id

 const itemId = req.params.itemId;

 // retrieve the user data from db
 const user = await user.findById(userId);

 if(!user){
    return res.status(404).json({ error: 'user not found' });
 }

 const itemIndex = user.cart.findIndex((item) => item._id.toString() === itemId);

 if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found in cart' });
 }

 // Remove the item from the cart array
  user.cart.splice(itemIndex, 1);

  await user.save();

  res.json({ message: 'Item removed from cart successfully'});
} catch (error){
  console.error(error);
  res.status(500).json({ message: 'Internal server error'});  
};
};
module.exports = {addToCart,removeFromCart,getCart}