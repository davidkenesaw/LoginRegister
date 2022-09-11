const path = require('path')
require('dotenv').config({ 
    path: path.resolve(__dirname, '../.env') 
})
const mysql = require('mysql');
const session = require('express-session')
const mysqlStore = require('express-mysql-session')(session)

//cloud mysql db connection
const dbConn = mysql.createConnection({
  host     : process.env.DBHOST,
  port     : process.env.DBPORT,
  user     : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  database : process.env.DBDATABASE
});

//session
const sessionStore = new mysqlStore({
  expiration: 10800000,
  creatDatabaseTable: true,
  schema: { 
    tableName:process.env.SESSIONTABLE,
    columnNames:{
      session_id: "session_id",
      expires:"expires",
      data:"data"
    }
  }
},dbConn)

const seshOption = session({
  key:"keyin",
  secret:process.env.SESSIONSECRETE,
  store:sessionStore,
  resave: false,
  saveUninitialized:false
})



//check if database gets connected
dbConn.connect(function(err) {
  if (err) {
    console.log("Database did not connect");
    console.log("host:" + process.env.DBHOST, process.env.DBPORT)
    console.log(process.env.DBUSER)
    console.log(process.env.DBPASSWORD)
    console.log(process.env.DBDATABASE)
    console.log(process.env.EMAIL)
    console.log(process.env.EMAILKEY)
    console.log(process.env.SECRETE)
    console.log(process.env.SESSIONSECRETE)
    console.log(process.env.SESSIONTABLE)
  }else{
    console.log("Database Connected!");
  }
  
});



module.exports = {dbConn,seshOption};