const express = require('express');
const controller = require('../controllers/post-controller');

const router = express.Router();

router.get('/', controller.getHome);

router.get('/admin', controller.getAdmin);

router.post('/posts', controller.createPost);

router.get('/posts/:id/edit', controller.getSinglePost);

router.post('/posts/:id/edit', controller.updatePost);

router.post('/posts/:id/delete', controller.deletePost);

module.exports = router;
