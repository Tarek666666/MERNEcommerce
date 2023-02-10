const mysql = require('mysql2');


const pool = mysql.createPool({

    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database:'shop'
})


module.exports = pool.promise();