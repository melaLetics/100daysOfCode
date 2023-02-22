const express = require('express');
const uuid = require('uuid');
const dataUtil = require('../util/restaurant-data');

const router = express.Router();

router.get('/restaurants', function (request, response) {
    let order = request.query.order;
    let nextOrder = 'desc';
    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }
    if (order === 'desc') {
        nextOrder = 'asc';
    }

    const storedRestaurants = dataUtil.getStoredRestaurants();

    storedRestaurants.sort(function (resA, resB) {
        if ((order === 'asc' && resA.name > resB.name) || (order === 'desc' && resB.name > resA.name)) {
            return 1;
        }
        return -1;
    });

    response.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants,
        nextOrder: nextOrder,
    });
});

router.get('/restaurants/:id', function (request, response) {
    const id = request.params.id;
    const storedRestaurants = dataUtil.getStoredRestaurants();
    for (const restaurant of storedRestaurants) {
        if (restaurant.id === id) {
            return response.render('restaurant-detail', { item: restaurant });
        }
    }
    response.status(404).render('404');
});

router.get('/recommend', function (request, response) {
    response.render('recommend');
});

router.post('/recommend', function (request, response) {
    const restaurant = request.body;
    restaurant.id = uuid.v4();
    const storedRestaurants = dataUtil.getStoredRestaurants();
    storedRestaurants.push(restaurant);
    dataUtil.storeRestaurants(storedRestaurants);

    response.redirect('/confirm');
});

router.get('/confirm', function (request, response) {
    response.render('confirm');
});


module.exports = router;