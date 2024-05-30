const Order = require('../models/order_model');
const Cart = require('../models/order_model');

function generateOrderCode() {
  // Generate an order code
  const prefix = 'ORD';
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();

  return `${prefix}-${randomPart}-${timestamp}`;
}

exports.placeOrder = async (req, res) => {
  const { cartId, userId } = req.body;

  try {
    
    const cart = await Cart.findOne({ cartId });
    const items = cart.items;

    
    let totalAmount = 0;
    
    items.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    // Create a new order
    const newOrder = new Order({
      customerName: req.body.customerName,
      address: req.body.address,
      items,
      totalAmount,
      code: generateOrderCode(),
    });

    // Save the order
    await newOrder.save();

    res.json({ message: 'Order placed successfully', orderId: newOrder._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createOrder = (req, res) => {
  const { customerName, address, items } = req.body;
  const orderCode = generateOrderCode();

  // Calculate total amount
  let totalAmount = 0;
  // Perform calculations based on item prices, quantities, etc.
  items.forEach(item => {
    totalAmount += item.price * item.quantity;
  });

  const newOrder = new Order({
    customerName,
    address,
    items,
    totalAmount,
    code: orderCode,
  });

  newOrder.save()
    .then(() => {
      res.json({ message: 'Order created successfully', orderCode });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
};