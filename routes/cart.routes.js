const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart_controllers');

router.get('/all', cartController.getAllCart)
router.post('/add/', cartController.addToCart);
router.delete('/one', cartController.removeFromCart);
router.delete('/:cartId', cartController.clearCart);
router.delete('/', cartController.clearCartAl);


router.get('/', cartController.getACart);
module.exports = router;
