function controller() {
    function indexMiddleware(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    }
    function index(req, res) {
        res.send('TODO: listing of books authors');
    }
    return {
        indexMiddleware,
        index
    };
}

module.exports = controller;
