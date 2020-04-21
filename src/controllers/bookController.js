// const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');
// const connect = require('../configs/connection');
const bookService = require('../services/goodReadService');

function controller(nav) {
    function middleware(req, res, next) {
        (async function query() {
            let client;
            try {
                // client = await MongoClient.connect(connect.mongodb.url);
                // debug('Connected to mongodb server.');

                // const db = client.db(connect.mongodb.dbName);
                // const { id } = req.params;
                // const book = await db.collection('books').findOne({ _id: new ObjectID(id) });
                const { id } = req.params;
                const book = await bookService.getById(id);
                debug(book);
                req.params.book = book;
            } catch (error) {
                debug(error.stack);
            }
            // client.close();
            next();
        }());
    }
    function getIndex(req, res) {
        (async function query() {
            let client;
            try {
                // client = await MongoClient.connect(connect.mongodb.url);
                // debug('Connected to mongodb server.');

                // const db = client.db(connect.mongodb.dbName);
                // const books = await db.collection('books').find().limit(10).toArray();
                const { book } = await bookService.getBooksByAuthorId();
                // debug(book);
                res.render('booksList', {
                    title: 'My Books',
                    nav,
                    books: book
                });
            } catch (error) {
                debug(error.stack);
            }
            // client.close();
        }());
    }
    function getById(req, res) {
        const { book } = req.params;
        res.render('book', {
            title: book.title,
            nav,
            book
        });
    }
    return {
        middleware,
        getIndex,
        getById
    };
}

module.exports = controller;
