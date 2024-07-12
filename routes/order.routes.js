const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order_controller');

router.post('/', orderController.createOrder);
router.delete('/:id', orderController.deleteOrder);
router.delete('/', orderController.deleteAllOrders);
router.get('/', orderController.getAllOrders )
router.get('/:cartId', orderController.getOrderById)
module.exports = router;
