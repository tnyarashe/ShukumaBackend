const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
});

const CartSchema = new Schema({
  items: [CartItemSchema],
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', CartSchema);



