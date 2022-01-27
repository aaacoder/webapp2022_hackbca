require('dotenv').config()

const mysql = require('mysql');
const util = require('util')

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Should not be in plain text, instead taken from env variables
  database: 'hackbca_example',
  connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT) || 10000
}

// connection.connect(function(err) {
//   if (err)
//     throw err;
//   console.log("Connected to the MySQL Server!");
// })

let pool = mysql.createPool(dbConfig);

// This makes a promise-style wrapper for the query() method
pool.queryPromise = util.promisify(pool.query)

module.exports = pool;