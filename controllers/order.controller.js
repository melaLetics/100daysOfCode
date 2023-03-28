const Order = require('../models/order.model');
const User = require('../models/user.model');

async function addOrder(req, res, next){
    const cart = res.locals.cart;
    let userDocument;

    try{
        userDocument = await User.findById(res.locals.uid);
        const order = new Order(cart, userDocument);
        console.log(order);
        await order.save();
    } catch(error) {
        next(error);
        return;
    }   

    req.session.cart = null;

    res.redirect('/orders');
}

function getOrders(req, res) {
    res.render('customer/order/all-orders');
}

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders
}
