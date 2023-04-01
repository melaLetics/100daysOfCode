const { MongoClient }= require('mongodb');

let database;

async function connectToDatabase() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    database = client.db('daily-quotes');
}

function getDb(){
    if (!database){
        throw new Error('You must connect to database first');
    }
    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}