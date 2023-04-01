const express = require('express');

const db = require('./data/database');

const quoteRoutes = require('./routes/quote.route');

const app = express();
app.use('/quote', quoteRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({
        message: 'Something went wrong'
    });
});

db.connectToDatabase().then(() => {
    app.listen(3000);
}).catch((error) => console.log('connection to database failed.'));
