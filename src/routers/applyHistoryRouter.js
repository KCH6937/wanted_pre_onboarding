const express = require('express');
const router = express.Router();

const applyHistoryController = require('../controllers/applyHistoryController');

router.get('/findAll', applyHistoryController.findAll);

module.exports = router;