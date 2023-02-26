const express = require('express');
const router = express.Router();
const db = require('../data/database');

router.get('/', function(request, response){
    response.redirect('/posts');
});

router.get('/posts', async function(request, response){
    const [posts] = await db.query('select post.*, author.name as author_name from post inner join author on author_id = author.id');
    response.render('posts-list', {posts: posts});
});

router.get('/posts/:id', async function(request, response){
    const id = request.params.id;
    const [post] = await db.query('select * from post where id = ?',[id]);
    response.render('post-detail', { item: post[0] });
});

router.post('/posts', async function(request, response){
    const data = [request.body.title, request.body.summary, request.body.content, request.body.author];
    await db.query('INSERT INTO post (title, summary, body, author_id) VALUES (?)', [data]);
    response.redirect('/posts');
});

router.get('/new-post', async function(request, response){
    const [authors] = await db.query('SELECT * FROM author');
    response.render('create-post', { authors: authors });
});

module.exports = router;