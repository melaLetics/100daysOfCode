const mongodb = require('mongodb');
const db = require('../data/database');
const ObjectId = mongodb.ObjectId;

class Post {
    constructor(title, content, id) {
        this.title = title;
        this.content = content;
        if (id) {
            this.id = new ObjectId(id);
        }
    }

    static async fetchAll() {
        return await db.getDb().collection('posts').find().toArray();
    }

    async fetchById() {
        if (!this.id) {
            return;
        }
        const post = await db.getDb().collection('posts').findOne({ _id: this.id });
        this.title = post.title;
        this.content = post.content;
    }

    async save() {
        let result;
        if (this.id) {
            result = await db
            .getDb()
            .collection('posts')
            .updateOne(
              { _id: this.id },
              { $set: { title: this.title, content: this.content } }
            );
        } else {
          result = await db.getDb().collection('posts').insertOne({
            title: this.title,
            content: this.content,
          });
        }
        return result;
    }

    async delete(){
        if (!this.id){
            return;
        }
        return await db.getDb().collection('posts').deleteOne({ _id: this.id });
    }
}

module.exports = Post;