const express = require('express');
const router = express.Router();
const itemController = require('../controllers/adminContoller');

router.post('/add-item', itemController.addItem);
router.put('/update-item/:itemId', itemController.updateItem);
router.delete('/delete-item/:itemId', itemController.deleteItem);

module.exports = router;