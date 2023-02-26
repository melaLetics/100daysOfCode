const express = require('express');
const router = express.Router();

router.get('/', function(request, response){
    response.redirect('/posts');
});

router.get('/posts', function(request, response){
    response.render('posts-list');
});

router.get('/new-post', function(request, response){
    response.render('create-post');
});

module.exports = router;