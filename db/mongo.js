var config = require('../config');
var mongo = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = config.url;
 
// Database Name
const dbName = 'charter';
 
function connect(callback, callbackParams){
    // Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    callback.call(db, callbackParams);
    client.close();
  });
}

function add(collectionName, data){
    return new Promise(function(resolve){
        return MongoClient.connect(url).then( (client) => {
                console.log("Connected successfully to server");
                const db = client.db(dbName);
                let collection = db.collection(collectionName);
                return collection.insert(data).then( (result) => {
                    client.close();
                    resolve(result);
                })
               
                // client.close();
        }).catch(function(err){
            console.log(err);
        })
    })
}

function findOne(collectionName, data){
    return new Promise(function(resolve){
        MongoClient.connect(url).then( (client) => {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            let collection = db.collection(collectionName);
            return collection.findOne(data).then( (docs) => {
                client.close();
                resolve(docs);
            })
        })
    })
}

module.exports = {
    add,
    findOne
};