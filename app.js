const path = require('path');

const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const app = express();
const sessionStore = new MySQLStore({
  host: 'localhost',
	port: 3306,
	user: 'root',
	password: '****',
	database: 'auth-demo'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'my-super-secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})


app.listen(3000);

