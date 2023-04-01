const express = require('express');
const router = express.Router();
const controller = require('../controller/quote.controller');

router.get('/', controller.getQuote);

module.exports = router;