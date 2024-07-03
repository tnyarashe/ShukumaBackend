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