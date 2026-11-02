const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'batman_db',
    port: Number(process.env.DB_PORT) || 3306,
    ...(process.env.DB_SSL === 'true' ? { ssl: { rejectUnauthorized: true } } : {})
});

module.exports = pool.promise();