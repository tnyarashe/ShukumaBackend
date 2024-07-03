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

    }
}
exports.getOrderById = async (req,res) =>{
    try{

    }catch{

    }
}
exports.getOneOrder = async (req, res) =>{
    try{

    }catch{

    }
}

// Update
exports.updateOrder = async (req, res) => {
    try{

    }catch{

    }
}

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
