//000859536
//David VanAsselberg
//9/5/2022

const path = require('path')
require('dotenv').config({ 
    path: path.resolve(__dirname, '../.env') 
})
const mysql = require('mysql2');
//cloud mysql db connection
const dbConn = mysql.createConnection({
  host     : process.env.DBHOST,
  port     : process.env.DBPORT,
  user     : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  database : process.env.DBDATABASE
});
//check if database gets connected
dbConn.connect(function(err) {
  if (err) {
    console.log("Database did not connect");
  }else{
    console.log("Database Connected!");
  }
  
});



module.exports = dbConn;