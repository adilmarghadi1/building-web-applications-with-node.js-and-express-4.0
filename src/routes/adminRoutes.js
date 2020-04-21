const express = require('express');
const adminController = require('../controllers/adminController')();

const adminRoutes = express.Router();

function router() {
    const { insertBooks } = adminController;

    adminRoutes.route('/')
        .get(insertBooks);

    return adminRoutes;
}

module.exports = router;
