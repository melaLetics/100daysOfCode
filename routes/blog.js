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
    const query = `select title, summary, body, date, 
    author.name as author_name, author.email as author_email 
    from post inner join author on post.author_id = author.id 
    where post.id = ?`;
    const [posts] = await db.query(query,[request.params.id]);
    if (!posts || posts.length === 0){
        return response.status(404).render('404');
    } 
    const postData = {
        ...posts[0],
        date: posts[0].date.toISOString(),
        humanReadableDate: posts[0].date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
    };

    response.render('post-detail', { item: postData });
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

router.get('/posts/:id/edit', async function(request, response){
    const query = `select * from post where id = ?`;
    const [posts] = await db.query(query, [request.params.id]);
    if (!posts || posts.length === 0) {
        return response.status(404).render(404);
    }
    response.render('update-post', { item: posts[0] });
});

router.post('/posts/:id/edit', async function(request, response){
    const query = `update post set title = ?, summary = ?, body = ?
    where id = ?`;
    await db.query(query, [
        request.body.title, 
        request.body.summary, 
        request.body.content, 
        request.params.id
    ]);
    response.redirect('/posts');
});

router.post('/posts/:id/delete', async function(request, response){
    const query = `delete from post where id = ?`;
    await db.query(query, [request.params.id]);
    response.redirect('/posts');
});

module.exports = router;