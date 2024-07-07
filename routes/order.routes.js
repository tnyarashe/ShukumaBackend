const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order_controller');

router.post('/orders', orderController.createOrder);
router.delete('/orders/:id', orderController.deleteOrder);
router.delete('/orders', orderController.deleteAllOrders);
router.get('/orders', orderController.getAllOrders )
module.exports = router;
