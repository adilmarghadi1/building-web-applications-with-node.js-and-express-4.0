const sql = {
    user: 'karljosebuena',
    password: 'Library123!',
    server: 'karl-library-server.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'karl-library-database',
    options: {
        encrypt: true
    }
};

const mongodb = {
    url: 'mongodb://localhost:27017',
    dbName: 'karl-library-database'
};

module.exports = {
    sql,
    mongodb
};
