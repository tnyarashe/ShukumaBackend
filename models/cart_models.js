const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
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
  }],
  totalPrice: {
    type: Number,
    virtual: true,
    get() {
      return this.items.reduce((total, item) => {
        return total + (item.productId.price * item.quantity);
      }, 0);
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

// // Virtual property for calculated total price
// CartSchema.virtual('totalPrice').get(function () {
//   return this.items.reduce((total, item) => {
//     return total + (item.productId.price * item.quantity);
//   }, 0);
// });

CartSchema.method('toJSON', function () {
  const { __v, password, ...object } = this.toObject();
  object.id = this._id.toString();
  return object;
});
const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart
