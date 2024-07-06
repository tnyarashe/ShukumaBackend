const express = require("express")
const router = express.Router()
const products = require('../controllers/product_controller')

router.post('/articles', products.createProduct)
router.get('/articles', products.getAllProducts)
router.get('/article/:id', products.getOneProduct)
router.delete('/article/:id', products.deleteProduct)
router.delete('/articles', products.deleteAllProducts)
router.put('/article/:id', products.updateProduct)

module.exports = router