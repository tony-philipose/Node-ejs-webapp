//get the data from table which id is 1

var con = require('./dbcon');
var User = require('./user');
var Sequelize = require('sequelize');
//Reading All Data
User.findOne({
    where: {id: 1}
}).then(users => {
    console.log(users)
  });