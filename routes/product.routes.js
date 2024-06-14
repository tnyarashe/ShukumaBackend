const express = require("express")
const router = express.Router()
const products = require('../controllers/product_controller')

router.post('/add', products.createProduct)
router.get('/all', products.getAllProducts)
router.get('/product/:id', products.getOneProduct)
router.delete('/delete/:id', products.deleteProduct)
router.put('/update/:id', products.updateProduct)
router.delete('/delete-all', products.deleteAllProducts)

module.exports = router