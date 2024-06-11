const express = require("express")
const router = express.Router()
const products = require('../controllers/product_controller')

router.post('/products', products.createProduct)
router.get('/products', products.getAllProducts)
router.get('/products', products.getOneProduct)

// router.get('/all', product.getAllProducts)
// router.get('/product', product.getOneProduct)
// router.post('/product/:id', product.updateOneProduct)
// router.get("/user",auth.verifyToken,user.user_dBoard);
// router.get("/admin",[auth.verifyToken, auth.isAdmin],user.admin_dBoard);

module.exports = router