const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminController');
const connect = require('../configs/connection');
const books = require('../data/books');

function controller() {
    function insertBooks(req, res) {
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(connect.mongodb.url);
                debug('Connected to mongodb server.');

                const db = client.db(connect.mongodb.dbName);
                const booksReponse = await db.collection('books').insertMany(books);

                res.json(booksReponse);
            } catch (error) {
                debug(error.stack);
            }
            client.close();
        }());
    }
    return {
        insertBooks
    };
}

module.exports = controller;
