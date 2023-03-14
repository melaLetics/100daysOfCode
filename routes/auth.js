const express = require('express');

const controller = require('../controllers/auth-controller');
const router = express.Router();

router.get('/signup', controller.getSignup);

router.get('/login', controller.getLogin);

router.post('/signup', controller.signup);

router.post('/login', controller.login);

router.post('/logout', controller.logout);

router.get('/401', controller.get401);

module.exports = router;
