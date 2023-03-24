const Product = require('../models/product.model');

async function addCartItem(req, res) {
    try {
        const product = await Product.findById(req.body.productId);
        const cart = res.locals.cart;
        cart.addItem(product);
        req.session.cart = cart;
        res.status(201).json({
            message: 'Cart updated',
            newTotalItems: cart.totalQuantity
        });
    } catch(error){
        next(error);
        return;
    }
}

module.exports = {
    addCartItem: addCartItem
}