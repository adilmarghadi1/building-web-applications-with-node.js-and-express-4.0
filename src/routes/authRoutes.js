const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

function router(nav) {
    const {
        signUpPost,
        profileMiddleware,
        profileGet,
        signInGet,
        signInPost
    } = authController(nav);
    authRouter.route('/signUp')
        .post(signUpPost);
    authRouter.route('/profile')
        .all(profileMiddleware)
        .get(profileGet);
    authRouter.route('/signIn')
        .get(signInGet)
        .post(signInPost);

    return authRouter;
}

module.exports = router;
