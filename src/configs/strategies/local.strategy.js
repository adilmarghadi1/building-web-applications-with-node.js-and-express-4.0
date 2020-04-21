const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStrategy');
const passport = require('passport');
const { Strategy } = require('passport-local');
const connect = require('../connection');

module.exports = () => {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            (async function authenticateUser() {
                let client;
                try {
                    client = await MongoClient.connect(connect.mongodb.url);
                    debug('Connected to mongodb server.');

                    const db = client.db(connect.mongodb.dbName);
                    const col = db.collection('users');

                    const user = await col.findOne({ username });
                    if (user.password === password) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                } catch (error) {
                    debug(error.stack);
                }
                client.close();
            }());
        }
    ));
};
