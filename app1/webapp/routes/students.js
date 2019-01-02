/*
* Author : Tony philipose
* Create on : 15-nov-18
* Reviwed by :
* student router include all actions of student entity
  students result, new student add, update student info.. .
*/

var express = require('express');
var router = express.Router();
var moment=require('moment');
var sess;
var con = require('./dbcon');

//---------get user listing-----
router.get('/list', studentLists);
router.get('/add', studentregisterForm);
router.post('/reg',studentRegisteration, fetchstudentId, createLogin);
router.get('/edit/:id',editstudentDetails);
router.post('/update',studentUpdate);
router.get('/marks',studentMarks);
router.get('/results', viewmarkDetails);

//-----view mark details of student-------
function viewmarkDetails(req, res){  
  if(req.session.regid != null || req.session.regid!= ""){
      //fetch marks
      var query = con.query('select firstserirsExam.markid,firstserirsExam.obtained,firstserirsExam.total, subjects.subject from firstserirsExam, subjects where subjects.subid=firstserirsExam.subid and firstserirsExam.studid=?',[req.session.regid],function(err,rows){
          if(err){console.error(err);
              res.render('pages/error',{ message: "connection not found"});
          }
          else{
              res.render('pages/results',{
                  data:rows,user:req.session.username
               });
          }
      });
 }
  else{
      res.render('pages/error',{ message: "Invalid Login.."});
  }
}


//------------get the all list of students-------------------
function studentLists(req, res){
  if(req.session.regid != null || req.session.regid!= ""){
    //fetch all student lists
    var query = con.query('select `studid`,`fname` ,`lname`,`dob`,`joindate`,`class`,`gender`,`contact`,`email` from students',function(err,rows){
      if(err){
        res.render('pages/error',{ message: "connection not found"});
      }
      else{
        res.render('pages/studentLists',{
          data:rows,user:req.session.username
       });
      }
    });
  }
  else{
    res.render('pages/error',{ message: "Invalid Login.."});
  }
}

//---------student registeration form redirect---------
function studentregisterForm(req,res){
  res.render('pages/registeration',{user:req.session.username});
}

/*--------------add new students form register and login in one function 
----------------using if else of oth sucess part of register to login--------------*/
/*
function studentRegisteration(req,res){
  var date = moment(date).format("YYYY-MM-DD");
  var data = [req.body.firstName,req.body.lastName,req.body.dob,date,req.body.class,req.body.contactNo,req.body.email,req.body.gender];
   var qryInsert = con.query('insert into students (`fname` ,`lname`,`dob`,`joindate`,`class`,`contact`,`email`,`gender`) values (?,?,?,?,?,?,?,?)',data, function(err){
     if(err){console.error(err);}
     else{
     // res.redirect('/teach/list');
     var qrymaxCount = con.query('select studid from students where contact=? and email=?',[req.body.contactNo,req.body.email], function(err,row){
       if(err){console.log(err);}else{
         var logdata = [req.body.email,req.body.firstName,'student',row[0].studid];
         console.log(logdata);
         var qurylogin = con.query('insert into login(username,password,usertype,regid) values(?,?,?,?)',logdata,function(err){
           if(err){console.log(err);}else{
            res.redirect('/teach/list');
           }
         });
       }

     })
     }
   })
}
*/

//------student registration middleware functions using next.-------
function studentRegisteration(req, res, next){
  var date = moment(date).format("YYYY-MM-DD");
  var data = [req.body.firstName,req.body.lastName,req.body.dob,date,req.body.class,req.body.contactNo,req.body.email,req.body.gender];
   var qryInsert = con.query('insert into students (`fname` ,`lname`,`dob`,`joindate`,`class`,`contact`,`email`,`gender`) values (?,?,?,?,?,?,?,?)',data, function(err,result){
     if(err){console.log(err);}
     else{
      return next();
     }
   });
}

// --------fetch latest student id from register for make login table referance-------
function fetchstudentId(req,res,next){
  var qrymaxCount = con.query('select studid from students where contact=? and email=?',[req.body.contactNo,req.body.email], function(err,row){
    if(err){console.log(err);}
    else{
      var logdata = [req.body.email,req.body.firstName,'student',row[0].studid];
      //console.log(logdata);
      res.datas = logdata;
      console.log(res.datas);
       next();
    }
  });
}

//--------insert into login table of new student account using middleware fn.--------- 
function createLogin(req,res){
  //console.log(req.datas);
  var value = res.datas;
  console.log(value);
  var qurylogin = con.query('insert into login(username,password,usertype,regid) values(?,?,?,?)',value,function(err){
    if(err){console.log(err);}else{
     res.redirect('/students/list');
    }
  });
}

/*refer middle ware fn - 
https://stackoverflow.com/questions/28128323/rendering-view-after-multiple-select-queries-in-express
*/

//-------Edit student details----------
function editstudentDetails(req,res){
  var sid = req.params.id;
  var queryeditStudent = con.query('select `studid`,`fname` ,`lname`,`dob`,`joindate`,`class`,`gender`,`contact`,`email` from students where `studid`=?',[sid], function(err,row){
    if(err){console.log(err);}else{
      res.render('pages/editstudentDetails',{
        data:row[0],user:req.session.username
     });
    }
  });
}

//---update studet data-----
function studentUpdate(req,res){
  var sid = {studid:req.body.studid};
  var data = {fname:req.body.firstName,lname:req.body.lastName,dob:req.body.dob,class:req.body.class,contact:req.body.contactNo,email:req.body.email};
  var updateQuery = con.query(' update students set ? where ?',[data,sid], function(err){
    if (err){console.log(err);}
    else{
      res.redirect('/students/list');
    }
  });
  console.log(data);
}

//--------enter student marks----------
function studentMarks(req, res){
  res.render('pages/studentMarks',{
    user:req.session.username
  });
}

//-----------------testing-------
router.get('/class',function(req,res){
  var classQuery = con.query('select distinct class from students order by class asc',function(err,row){
    if(err)console.log(err);
    res.json(row);
  })
});



router.post('/class',function(req,res){
  var reqData =  req.body;
  console.log(reqData);
  var studentsQuery = con.query('select studid,fname from students where ?',[reqData],function(err,row){
    if(err)console.log(err);
    console.log(row);
    // req.session.class=row;
    res.json(row);
  })
});

router.post('/subjects',function(req,res){
  var reqClass = req.body;
  var subjectQuery = con.query('select subjects.subid,subjects.subject from subjects,students,classSubjects where classSubjects.class=students.class and classSubjects.subid=subjects.subid and students.?',[reqClass],function(err,row){
    if(err)console.log(err);
    console.log(row);
    res.json(row);
  });
});

router.get('/studentsList',function(req,res){
  var students = req.session.class;
  console.log(students);
  res.json(students);
});
module.exports = router;
