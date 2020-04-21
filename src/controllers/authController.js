const debug = require('debug')('app:authController');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');
const connect = require('../configs/connection');

function controller(nav) {
    function signUpPost(req, res) {
        const { username, password } = req.body;
        (async function addUser() {
            let client;
            try {
                client = await MongoClient.connect(connect.mongodb.url);
                debug('Connected to mongodb server.');
                const db = client.db(connect.mongodb.dbName);
                const col = db.collection('users');
                const user = { username, password };
                const [result] = (await col.insertOne(user)).ops;
                // debug(result.ops);
                req.login(result, () => {
                    res.redirect('/auth/profile');
                });
            } catch (error) {
                debug(error.stack);
            }
            client.close();
        }());
    }
    function profileMiddleware(req, res, next) {
        if (!req.user) {
            res.redirect('/');
            return;
        }
        next();
    }
    function profileGet(req, res) {
        res.render('profile', {
            title: 'Profile',
            nav,
            user: req.user
        });
    }
    function signInGet(req, res) {
        debug('here');
        res.render('signin', {
            title: 'Sign In',
            nav
        });
    }
    const signInPost = (passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
    }));

    return {
        signUpPost,
        profileMiddleware,
        profileGet,
        signInGet,
        signInPost
    };
}

module.exports = controller;
