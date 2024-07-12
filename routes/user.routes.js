const express = require("express")
const router = express.Router()
const path =  require('path')
const user = require('../controllers/users_controller')
const auth = require('../middleware/auth.middleware')

router.get('/all', user.getAllUsers)
router.get('/user', user.getOne)
router.put('/user/:id', user.updateOne)
router.get("/:id",user.getOne);
// router.get("/admin",[auth.verifyToken, auth.isAdmin],user.admin_dBoard);

module.exports = router