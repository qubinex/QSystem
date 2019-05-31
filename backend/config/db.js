// var mysql=require('mysql');
require('dotenv').config()
var mysql = require('mysql2/promise'); // or require('mysql2').createConnectionPromise

var connection = mysql.createPool({ 
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  //dateStrings: true,
  multipleStatements: true,
  timezone: 'UTC',
});

module.exports=connection;