const mongoDb = require('mongodb');
const db = require('../data/database');

class Product {

  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findById(productId){
    let prodId;
    try {
      prodId = new mongoDb.ObjectId(productId);
    } catch(error) {
      error.code = 404;
      throw error;
    }
    const product = await db.getDb().collection('product').findOne({
      _id: prodId
    });

    if (!product){
      const error = new Error('Could not find product with given id.');
      error.code = 404;
      throw error;
    }
    
    return new Product(product);
  }

  static async findAll(){
    const products = await db.getDb().collection('product').find().toArray();
    
    return products.map(productDocument => {
      return new Product(productDocument);
    });
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image
    };

    if (this.id){
      const prodId = new mongoDb.ObjectId(this.id);
      
      if(!this.image){
        delete productData.image;
      }

      await db.getDb().collection('product').updateOne({
        _id: prodId
      }, {
        $set: productData
      });
    } else {
      await db.getDb().collection('product').insertOne(productData);
    }
  }

  updateImageData(){
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  replaceImage(newImage){
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    const prodId = new mongoDb.ObjectId(this.id)
    return db.getDb().collection('product').deleteOne({
      _id: prodId
    });
  }

}

module.exports = Product;
