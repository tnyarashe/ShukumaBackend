const express = require("express")
const router = express.Router()
const product = require('../controllers/product_controller')

router.post('/create', product.createProduct)
router.get('/products', product.getAllProducts)

// router.get('/all', product.getAllProducts)
// router.get('/product', product.getOneProduct)
// router.post('/product/:id', product.updateOneProduct)
// router.get("/user",auth.verifyToken,user.user_dBoard);
// router.get("/admin",[auth.verifyToken, auth.isAdmin],user.admin_dBoard);

module.exports = router