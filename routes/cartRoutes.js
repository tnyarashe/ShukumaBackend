const express = require('express')
const router = express.Router()
const order = require('../middleware/order.middleware')

const {
    addToCart,
    removeFromCart,
    getCart
} = require('../controllers/cart_controllers')

//POST /cart/add
router.post('/add', addToCart);

// DELETE /cart/remove/:itemId
router.post('/remove:itemId', removeFromCart);

// GET /cart
router.get('/',getCart);

module.exports = router;