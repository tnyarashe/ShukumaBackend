const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order_controller');

router.post('/', orderController.createOrder);
router.delete('/:id', orderController.deleteOrder);
router.delete('/', orderController.deleteAllOrders);
router.get('/:userid', orderController.getAllOrders)
router.get('/driver/:driverid', orderController.getAllDriverOrders)
router.get('/business/:businessid', orderController.getAllBusinessOrders)
router.get('/one/:cartId', orderController.getOrderById)
router.put('/update/:id', orderController.updateOrder)
router.get('/', orderController.fetchAllOrders)

module.exports = router;
