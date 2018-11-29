/* db connection page
   connect to mysql assignment bd.
*/
var Sequelize = require('sequelize');
 
//Setting up the config
var sequelize = new Sequelize('assignments', 'root', 'Assyst@123', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = sequelize;

