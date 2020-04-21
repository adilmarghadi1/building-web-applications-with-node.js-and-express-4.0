const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadService');

const parser = xml2js.Parser({ explicitArray: false });

function goodRead() {
    function getBooksByAuthorId() {
        return new Promise((resolve, reject) => {
            axios.get('https://www.goodreads.com/author/list/18541?format=xml&key=2a7dG3js1pZuDcEzGcc2Fg')
                .then((response) => {
                    parser.parseString(response.data, (err, data) => {
                        if (err) {
                            debug(err);
                            reject(err);
                        } else {
                            resolve(data.GoodreadsResponse.author.books);
                        }
                    });
                })
                .catch((error) => {
                    debug(error);
                    reject(error);
                });
        });
    }
    function getById(bookId) {
        debug(bookId);
        return new Promise((resolve, reject) => {
            axios.get(`https://www.goodreads.com/book/show/${bookId}.xml?key=2a7dG3js1pZuDcEzGcc2Fg`)
                .then((response) => {
                    parser.parseString(response.data, (err, data) => {
                        if (err) {
                            debug(err);
                            reject(err);
                        } else {
                            resolve(data.GoodreadsResponse.book);
                        }
                    });
                })
                .catch((error) => {
                    debug(error);
                    reject(error);
                });
        });
    }
    return { getBooksByAuthorId, getById };
}

module.exports = goodRead();
