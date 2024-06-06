const express = require('express');
const order = require('../models/order_model');
const router = express.Router();

// GET /api/orders
router.get('/orders', (req, res) => {
  Order.find()
    .then(orders => {
      res.json(orders);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.get('/orders/:Id', (req, res) => {
  const orderId = req.params.orderId;

  const order = {
    items:'Example product',
    quantity: 5
  }
})
// POST /api/orders
router.post('/orders', (req, res) => {
  const { customerName, address, items, totalAmount, code } = req.body;

  // Create a new order using the Order model
  const newOrder = new Order({
    customerName,
    address,
    items,
    totalAmount,
    code
  });

  // Save the new order in the database
  newOrder.save()
    .then(savedOrder => {
      res.status(201).json(savedOrder);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
    res.render('order', { order });
});

module.exports = router;