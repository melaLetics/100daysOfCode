const express = require('express');

const router = express.Router();

const controller = require('../controllers/order.controller');

router.post('/', controller.addOrder);

router.get('/', controller.getOrders);

module.exports = router;