const Quote = require('../models/quote.model');

async function getQuote(req, res, next){
    try {
        const randomQuote = await Quote.getRandomQuote();
        res.json({
            quote: randomQuote
        })
    } catch(error) {
        return next(error);
    }
}   

module.exports = {
    getQuote: getQuote
}