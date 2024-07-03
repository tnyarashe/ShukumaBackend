const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart_controllers');

router.get('/:cartId', cartController.getCart);
router.post('/add/', cartController.addToCart);
router.delete('/:cartId/:productId', cartController.removeFromCart);
router.delete('/:cartId', cartController.clearCart);

module.exports = router;
