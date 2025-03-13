// import mysql
const mysql = require('mysql2');

//collegamento nodeJS-MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'posts'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});
 
module.exports = connection;