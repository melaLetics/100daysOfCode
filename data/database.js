const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'auth-demo',
    user: 'root',
    password: '****'
});

module.exports = pool;