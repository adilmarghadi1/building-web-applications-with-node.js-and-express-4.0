const express = require('express');
const authorController = require('../controllers/authorController')();

const adminRouter = express.Router();

function router() {
    const { indexMiddleware, index } = authorController;
    adminRouter.route('/')
        .all(indexMiddleware)
        .get(index);
    return adminRouter;
}

module.exports = router;
