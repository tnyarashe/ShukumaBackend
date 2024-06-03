const express = require('express');
const order = require('../models/order_model');
const order = require('../controllers/order_controller')
const order = require('../middleware/order.middleware')

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

// POST /api/orders
router.post('/orders', (req, res) => {
  // Access request body to create a new order
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
});

module.exports = router;