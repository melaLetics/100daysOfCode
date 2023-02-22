const path = require('path');

const express = require('express');

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

app.use(function(request, response){
    response.status(404).render('404');
});

app.use(function(error, request, response, next){
    response.status(500).render('500');
})

app.listen(3000);