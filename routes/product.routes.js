const express = require("express")
const router = express.Router()
const products = require('../controllers/product_controller')

router.post('/add-product', products.createProduct)
router.get('/all', products.getAllProducts)
router.get('/get-one/:id', products.getOneProduct)
router.delete('/delete-one/:id', products.deleteProduct)
router.delete('/delete-all', products.deleteAllProducts)
router.put('/update-one/:id', products.updateProduct)

module.exports = router