'use strict';

const mongoClient = require('mongodb').MongoClient;
// const url = 'mongodb+srv://sggv:<password>@gmcluster1-vndwa.mongodb.net/test?retryWrites=true&w=majority'
const url = 'mongodb://localhost:27017';
const dbName = 'GMdb';

var dbConn = null;

module.exports = {
    connectToDB,
}

function connectToDB() {
    if (dbConn) return Promise.resolve(dbConn);
    

    return new Promise((resolve, reject) => {
        mongoClient.connect(url,{ useNewUrlParser: true }, (err, client) => {
            if (err) return reject('Cannot connect to Mongo')
            dbConn = client.db(dbName);
            return resolve(dbConn);
        })
    })
}