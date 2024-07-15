const Order = require('../models/order_model');
const User = require('../models/user_model');
const Cart = require('../models/cart_models');


exports.getAllOrders = async (req, res) =>{
    try{
        const user = req.params.userid
        const orders = await Order.find({userId:user});
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({error:"An error occured while fetching orders"});
    };
};

exports.getAllDriverOrders = async (req, res) =>{
    try
    {
        const DriverId = req.params.driverid

        const orders = await Order.find();
        const drivers_orders = [];

        for(let order of orders){
            if(DriverId == order.deliveryDetails.DriverId){
                drivers_orders.push(order)
            }
        }
        
        res.status(200).json(drivers_orders);
    }catch(error){
        console.log(error)
        res.status(500).json({error:error});
    };
};

exports.createOrder = async (req, res) => {
  try {
    
    const userId = req.body.userId;
    const cartId = req.body.cartId;
    const address  = req.body.address
    
    console.log(req.body)

    // Check if user and cart exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(400).send({ message: 'Cart not found' });
    }

    // Create a new order object
    const newOrder = new Order({
      userId,
      cartId,
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        // price: item.productId.price,
      })),
    //   totalPrice: cart.totalPrice,
    });

    // Get user's shipping address (replace with your logic)
    const shippingAddress = address; // Replace with actual function
    newOrder.shippingAddress.address = shippingAddress.delA;
    newOrder.shippingAddress.coordinates = shippingAddress.cod;
    newOrder.deliveryDetails.DriverId = "1234567890"
    newOrder.deliveryDetails.coordinates = {lat:0.0, lng:0.0}

    
    await newOrder.save(); 
    
    await Cart.findByIdAndDelete(cartId);

    res.status(201).send({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating order' });
  }
}

exports.getOrderById = async (req,res) =>{
    try{
        // const userId = req.query.userId
        const cartId = req.params.cartId
        // console.log(userId)
    
        const order = await Order.findOne({cartId}).populate( { path: 'items.productId'}).populate({ path: 'userId', select: '-password' });
        if (!order) {
          res.status(404).json({ message: 'Order not found' });
          return;
        }
        user = 
        
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
       const id = req.params.id;
       
       const order = await Order.findById(id);

       if(!order) {
        res.status(400).json({ message: 'Order not found'});
       }

    //    order.user = user;
    //    order.total = total;
    //    order.items = items;
       order.status = req.body.status
       order.deliveryDetails.coordinates = req.body.driverLoca

    //    console.log(req.body.status)
    //    console.log(req.body.driverLoca)

    //    return res.status(200).json("yes");

       const updatedOrder = await order.save();

       res.status(200).json(updatedOrder);
    }catch (error){
        res.status(500).json({ message: error.message });
    }
};

// Delete
exports.deleteOrder = async (req,res) =>{
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.status(200).send('Order deleted');
    } catch (error) {
        res.status(500).send(error);
    }
}
exports.deleteAllOrders = async (req,res) =>{
    try {
        const order = await Order.deleteMany()
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.status(200).send('Orders deleted');
    } catch (error) {
        res.status(500).send(error);
    try {
        const order = await Order.deleteMany()
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.status(200).send('Orders deleted');
    } catch (error) {
        res.status(500).send(error);
     }
    }
}