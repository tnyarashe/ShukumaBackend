const express = require('express');
const order = require('../models/order_model');
const router = express.Router();

router.delete('/orders/:id', orderController.deleteOrder);
router.delete('/orders/', orderController.deleteAllOrders);

module.exports = router;