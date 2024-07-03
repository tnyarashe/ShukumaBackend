const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order_controller');

router.post('/', orderController.createOrder);
router.delete('/orders/:id', orderController.deleteOrder);
router.delete('/orders/', orderController.deleteAllOrders);

module.exports = router;