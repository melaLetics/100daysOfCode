const path = require('path');

const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');

const authRoutes = require('./routes/auth.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

const csrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handlers');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectAdminRoutes = require('./middlewares/protect-admin-routes');
const cartMiddleware = require('./middlewares/cart');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(cartMiddleware);

app.use(csrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(authRoutes);
app.use(baseRoutes);
app.use(productRoutes);
app.use('/cart', cartRoutes);
app.use(protectAdminRoutes);
app.use('/orders', orderRoutes);
app.use('/admin',adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
.then(() => {
    app.listen(3000);
})
.catch(error => {
    console.log('Failed to connect to database!');
    console.log(error);
});
