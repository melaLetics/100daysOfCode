const db = require('../data/database');

class Order {
    // status => pending, filfilled, cancelled
    constructor(cart, userData, status = 'pending', date, orderId){
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
        this.orderId = orderId;
    }

    save(){
        if (this.id) {

        } else {
            const orderDocument = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status
            };
            return db.getDb().collection('order').insertOne(orderDocument);
        }
    }

}

module.exports = Order;