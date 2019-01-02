/*
* Author : Tony philipose
* Create on : 15-nov-18
* Reviwed by :
* users router is used for login account, verify the user
  login and redirect pages to the corresponding pages of 
  different user types, and logout .
*/

//---import required modeules for this router.-----
var express = require('express');
var session = require('express-session');
var con = require('./dbcon');
var router = express.Router();
var sess;

//---users listing-----
router.get('/', logIn);
router.post('/',verifyUser);
router.get('/logout', logOut);

//--------redirect on login page-------
function logIn(req, res){
  res.render('pages/login');
}

//--------verify User account is valid. ------------
function verifyUser(req, res){
  var userName = req.body.username;
  req.session.username = userName;
  var password = req.body.password;
  
      // ---fetch data from login table using the get username and password.----
      var query = con.query("SELECT * FROM login where username=? and password=?",[userName,password], function(err, row){
        if(err){res.render('pages/error',{ message: "Invalid"});}else{
        if(row.length == 0){
          res.render('pages/error',{ message: "Invalid Username/Password"});
        }else{
            req.session.regid=row[0].regid;
            console.log(req.session.regid);
            if(row[0].usertype == 'student'){
              res.redirect('/students/results');
            }else if(row[0].usertype == 'teacher'){
              res.redirect('/students/list');
            }
            else{
              res.render('pages/error',{ message: "Invalid User.."});
            }
        }}
      })
   
}

//------------logout function-----------

function logOut(req,res){
  req.session.regid=null;
  res.redirect('/');
  console.log(req.session.regid);
}

module.exports = router;
