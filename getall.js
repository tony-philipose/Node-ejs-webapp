//get all the data from the table user

var con = require('./dbcon');
var User = require('./user');
var Sequelize = require('sequelize');
//Reading All Data
User.findAll({
}).then(users => {
    console.log(users)
  })