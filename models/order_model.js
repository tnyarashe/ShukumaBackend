
const mongoose = require('mongoose');
const Cart  = require('../models/cart_models')
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: { // Store the price at the time of order creation
      type: Number,
    //   required: true,
    },
  }],
  shippingAddress: {
    address:String,
    coordinates:{
      lat:{
        type: Number,
        required: true,
        default: 0.0
      },
      lng:{
        type: Number,
        required: true,
        default: 0.0
      }
    },
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'in-progress', 'cancelled', 'complete'],
    default: 'pending',
  },
  deliveryDetails:{
    DriverId: {
      type: String,
      // ref: 'Driver',
      required: true
    },
    coordinates:{
      lat:{
        type: Number,
        required: true,
        default: 0.0
      },
      lng:{
        type: Number,
        required: true,
        default: 0.0
      }
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// OrderSchema.virtual('shippingAddress').get(function () {
//   // Implement logic to retrieve shipping address from User model based on userId
// });

// OrderSchema.pre('save', async function (next) {
//   const cart = await Cart.findById(this.cartId);
//   if (!cart) {
//     throw new Error('Cart not found');
//   }

//   // Transfer items from cart to order (optional)
//   // ... (logic to populate order.items and calculate totalPrice)

//   this.totalPrice = cart.totalPrice; // Or calculate total price based on order.items
//   next();
// });

OrderSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


const Order = mongoose.model('Order', OrderSchema)
module.exports = Order