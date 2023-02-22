const path = require('path');

const express = require('express');
const app = express();

app.get('/', function(request, response) {
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    response.sendFile(htmlFilePath);
})

app.get('/restaurants', function(request, response){
    const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    response.sendFile(htmlFilePath);
});

app.get('/recommend', function(request, response){
    const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    response.sendFile(htmlFilePath);
});

app.get('/about', function(request, response){
    const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    response.sendFile(htmlFilePath);
})

app.get('/confirm', function(request, response){
    const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    response.sendFile(htmlFilePath);
});

app.listen(3000);