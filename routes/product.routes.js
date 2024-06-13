const express = require("express")
const router = express.Router()
const products = require('../controllers/product_controller')

router.post('/create', products.createProduct)
router.get('/all', products.getAllProducts)
router.get('/product/:id', products.getOneProduct)
router.delete('/delete/:id', products.deleteProduct)
// router.put('/product/update/:id', products.updateProduct)
// router.get("/user",auth.verifyToken,user.user_dBoard);
// router.get("/admin",[auth.verifyToken, auth.isAdmin],user.admin_dBoard);

module.exports = router