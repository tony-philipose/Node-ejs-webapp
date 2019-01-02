/*
* Author : Tony philipose
* Create on : 15-nov-18
* Reviwed by :
* dbcon router is used for connect with mysql database
  and exports to use in different routers.
*/
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:"localhost",
     user:"root",
     password:"Assyst@123",
     database:"assignments"
});

connection.connect(function(err) {
    if (err) {
        console.error(err);
    }else{console.log('connected');}
});

module.exports = connection;