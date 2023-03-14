const path = require('path');

const express = require('express');
const session = require('express-session');

const csrf = require('csurf');

const sessionConfig = require('./config/session');
const authMiddleware = require('./middlewares/auth-middleware');
const csrfTokenMiddleware = require('./middlewares/csrf-token-middleware');
const db = require('./data/database');
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const auth = require('./middlewares/auth-middleware');

const mongeDBSessionStore = sessionConfig.createSessionStore(session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig.createSessionConfig(mongeDBSessionStore)));
app.use(csrf());

app.use(csrfTokenMiddleware);
app.use(authMiddleware);

app.use(blogRoutes);
app.use(authRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
