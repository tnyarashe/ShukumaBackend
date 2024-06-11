const express = require("express")
const router = express.Router()
const path =  require('path')
const user = require('../controllers/users.controller')
const auth = require('../middleware/auth.middleware')
const product = require("../models/product_model")

router.get('/all', product.getAllProducts)
router.get('/product', product.getOneProduct)
router.put('/product/:id', product.updateOneProduct)
// router.get("/user",auth.verifyToken,user.user_dBoard);
// router.get("/admin",[auth.verifyToken, auth.isAdmin],user.admin_dBoard);

module.exports = router