const favsController = require('../controllers/favourites_controller')
const express = require('express');
const router = express.Router();

router.delete('/:userId',favsController.remove);
router.get('/:userId', favsController.fetchAll);
router.post('/', favsController.add);
  



module.exports = router