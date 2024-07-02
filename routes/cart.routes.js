const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart_controllers');

router.get('/:cartId', cartController.getCart);
router.post('/add/:cartId', cartController.addToCart);
// router.post('/remove/:id', cartController.removeFromCart);

module.exports = router;
