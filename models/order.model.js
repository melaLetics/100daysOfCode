const db = require('../data/database');
const mongodb = require('mongodb');

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

    static transformOrderDocument(orderDoc) {
        return new Order(
          orderDoc.productData,
          orderDoc.userData,
          orderDoc.status,
          orderDoc.date,
          orderDoc._id
        );
      }
    
      static transformOrderDocuments(orderDocs) {
        return orderDocs.map(this.transformOrderDocument);
      }

      static async findAll() {
        const orders = await db
          .getDb()
          .collection('order')
          .find()
          .sort({ _id: -1 })
          .toArray();
    
        return this.transformOrderDocuments(orders);
      }

      static async findAllForUser(userId) {
        const uid = new mongodb.ObjectId(userId);
    
        const orders = await db
          .getDb()
          .collection('order')
          .find({ 'userData._id': uid })
          .sort({ _id: -1 })
          .toArray();
    
        return this.transformOrderDocuments(orders);
      }
    
      static async findById(orderId) {
        const order = await db
          .getDb()
          .collection('order')
          .findOne({ _id: new mongodb.ObjectId(orderId) });
    
        return this.transformOrderDocument(order);
      }

    save(){
        if (this.orderId) {
          const orderId = new mongodb.ObjectId(this.id);
          return db
            .getDb()
            .collection('order')
            .updateOne({ _id: orderId }, { $set: { status: this.status } });
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