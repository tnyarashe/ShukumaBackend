const express = require('express')
const router = express.Router()
const order = require('../middleware/order.middleware')

const cartHandlers = require('../controllers/cart_controllers')

//POST /cart/add
router.post('/add', cartHandlers.addToCart);

// DELETE /cart/remove/:itemId
router.post('/remove:itemId', cartHandlers.removeFromCart);

// GET /cart
router.get('/',cartHandlers.getCart);

module.exports = router;