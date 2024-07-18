const favsController = require('../controllers/favourites_controller')
const express = require('express');
const router = express.Router();

router.delete('/:id',favsController.remove);
router.get('/', favsController.fetchAll);
router.post('/', favsController.add);
router.delete('/',favsController.removeAll)



module.exports = router