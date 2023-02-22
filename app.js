const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', function(request, response) {
    response.render('index');
})

app.get('/restaurants', function(request, response){
    const storedRestaurants = getStoredRestaurants();
    response.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length ,
        restaurants: storedRestaurants
    });
});

app.get('/restaurants/:id', function(request, response){
    const id = request.params.id;
    const storedRestaurants = getStoredRestaurants();
    for (const restaurant of storedRestaurants) {
        if (restaurant.id === id) {
            return response.render('restaurant-detail', { item: restaurant });
        }
    }
    response.status(404).render('404');
});

app.get('/recommend', function(request, response){
    response.render('recommend');
});

app.post('/recommend', function(request, response){
    const restaurant = request.body;
    restaurant.id = uuid.v4();
    const storedRestaurants = getStoredRestaurants();
    storedRestaurants.push(restaurant);
    storeRestaurants(storedRestaurants);

    response.redirect('/confirm');
});

app.get('/about', function(request, response){
    response.render('about');
})

app.get('/confirm', function(request, response){
    response.render('confirm');
});

app.use(function(request, response){
    response.status(404).render('404');
});

app.use(function(error, request, response, next){
    response.status(500).render('500');
})

app.listen(3000);