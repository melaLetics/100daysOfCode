const Product = require('../models/product.model');

function getCart(req, res){
    res.render('customer/cart/cart');
}

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

function updateCartItem(req, res) {
    const cart = res.locals.cart;
    const updatedItemData = cart.updateItem(req.body.productId, req.body.quantity);
    req.session.cart = cart;
    res.json({
        message: 'Item updated',
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice
        }
    });

}

module.exports = {
    addCartItem: addCartItem,
    getCart: getCart,
    updateCartItem: updateCartItem
}
