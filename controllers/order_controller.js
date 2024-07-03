// const Order = require('../models/order_model');
// const Cart = require('../models/cart_models');


// function generateOrderCode() {
//   // Generate an order code
//   const prefix = 'ORD';
//   const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
//   const timestamp = Date.now().toString(36).toUpperCase();

//   return `${prefix}-${randomPart}-${timestamp}`;
// }

// exports.placeOrder = async (req, res) => {
//   const { cartId, userId } = req.body;

//   try {
    
//     const cart = await Cart.findOne({ cartId });
//     const items = cart.items;

//     let totalAmount = 0;
    
//     items.forEach(item => {
//       totalAmount += item.price * item.quantity;
//     });

//     // Create a new order
//     const newOrder = new Order({
//       customerName: req.body.customerName,
//       address: req.body.address,
//       items,
//       totalAmount,
//       code: generateOrderCode(),
//     });

//     // Save the order
//     await newOrder.save();

//     res.json({ message: 'Order placed successfully', orderId: newOrder._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// exports.createOrder = (req, res) => {
//   const { customerName, address, items } = req.body;
//   const orderCode = generateOrderCode();

//   // Calculate total amount
//   let totalAmount = 0;
//   // Perform calculations based on item prices, quantities, etc.
//   items.forEach(item => {
//     totalAmount += item.price * item.quantity;
//   });

//   const newOrder = new Order({
//     customerName,
//     address,
//     items,
//     totalAmount,
//     code: orderCode,
//   });

//   newOrder.save()
//     .then(() => {
//       res.json({ message: 'Order created successfully', orderCode });
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// };
const {default: mongoose}  = require('mongoose');
const Order = require('../models/order_model');

// Get 
exports.getAllOrders = async (req, res) =>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({error:"An error occured while fetching orders"});
    };
};
exports.createOrder = async (req, res) =>{
    try{
       const { user, total, items} = req.body;
    
       const Order = new Order({
        user,
        total,
        items,
       });

       const newOrder = await Order.save();
       res.status(201).json(newOrder);
    }catch{
       res.status(500).json({ error:"An error occured while fetching orders" });
    }
}
exports.getOrderById = async (req,res) =>{
    try{
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
          res.status(404).json({ message: 'Order not found' });
          return;
        }
        res.status(200).json(order);
    }catch{
        res.status(500).json({ error:"An error occured while fetching orders" });
    }
}
exports.getOneOrder = async (req, res) =>{
    try{
       const orderId = req.params.id;
       const order = OrderService.getOneOrder(orderId);
       res.status(200).json(order);
    }catch (error){
       res.status(400).json({ error: error.message });
    }
};

// Update
exports.updateOrder = async (req, res) => {
    try{
       const { id } = req.params;
       const { user, total, items } = req.body;
       
       const order = await Order.findById(id);
       if(!order) {
        res.status(400).json({ message: 'Order not found'});
       }

       order.user = user;
       order.total = total;
       order.items = items;

       const updatedOrder = await order.save();
       res.status(200).json(updatedOrder);
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

// Delete
exports.deleteOrder = async (req,res) =>{
    try{
       
    }catch{

    }
}
exports.deleteAllOrders = async (req,res) =>{
    try{

    }catch{

    }
}