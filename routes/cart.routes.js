const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart_controllers');

router.get('/alle', cartController.getAllCart)
router.post('/add/', cartController.addToCart);
router.delete('/one/:productId', cartController.removeFromCart);
router.delete('/:cartId', cartController.clearCart);

router.get('/', cartController.getACart);
module.exports = router;
