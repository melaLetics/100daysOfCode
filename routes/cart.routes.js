const express = require('express');

const router = express.Router();

const controller = require('../controllers/cart.controller');

router.get('/', controller.getCart);

router.post('/items', controller.addCartItem);

router.patch('/items', controller.updateCartItem);

module.exports = router;
