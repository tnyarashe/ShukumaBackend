const express = require('express');
const order = require('../models/order_model');
const router = express.Router();

router.post('/add', order.placeOrder)

router.get('all', order.getAllOrders)
router.delete('/orders/:id', orderController.deleteOrder);
router.delete('/orders/', orderController.deleteAllOrders);

module.exports = router;