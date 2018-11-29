//update data in the table using with the firstname

var User = require('./user');
User.findOne({  
    firstname: 'Maxy-boi-boi'
  })
  .then(User => {
    User.updateAttributes({
        about: 'lll'
    });
  });