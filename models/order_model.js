// const mongoose = require('mongoose');
// const orderSchema = mongoose.Schema({
//   customerName: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   items: {
//     type: [{
//       name: {
//         type: String,
//         required: true
//       },
//       price: {
//         type: Number,
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: true
//       }
//     }],
//     required: true
//   },
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   code: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   isCart: {
//     type: Boolean,
//     default: false
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const order = mongoose.model('order', orderSchema);

// module.exports = order;