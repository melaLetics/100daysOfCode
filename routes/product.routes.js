const express = require('express');

const controller = require('../controllers/product.controller');

const router = express.Router();

router.get('/products', controller.getAllProducts);

router.get('/products/:id', controller.getProductDetails);

module.exports = router;