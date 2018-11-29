//insert values to the table user

var con = require('./dbcon');
var User = require('./user');
var Sequelize = require('sequelize');
//Reading All Data
User.sync({force: false}).then(() => {
    // Table created
    return User.create({
      firstname: 'bbin',
      lastname: 'mmnc',
      username: 'powv',
      about: 'nothing',
      email:'sample@gmail.in',
      password: 'ertiga',
      last_login: '11-01-1122',
      status:'active'
    });
  });