const express = require("express")
const router = express.Router()
const path =  require('path')
const user = require('../product/product_controller')
// const auth = require('../middleware/auth.middleware')
router.get('/all', product.getAllProducts)
router.get('/product', product.getOneProduct)
router.post('/product/:id', product.updateOneProduct)
// router.get("/user",auth.verifyToken,user.user_dBoard);
// router.get("/admin",[auth.verifyToken, auth.isAdmin],user.admin_dBoard);

module.exports = router