var fs = require('fs');
fs.readFile('toni.doc', function(err,data){
    if(err)return console.error(err);
    var t = data.toString();
    console.log(t+'h');
   // fs.writeFile('toni.doc','haiii',write);
   fs.appendFile('toni.doc','kkk',write);
});
console.log('ended');

fs.appendFile('toni.doc','appetnded', function(err){
    if(err)return console.error(err);
    else  console.log('ok done');
    fs.readFile('toni.doc',callbk);
});
var callbk = function(err, data){
    if(err) return console.error(err);
    console.log(data.toString());
    
};


// fs.writeFile('toni.doc','its writted sucssssessfuelly', function(err){
    var write = function(err, msg, data){
    if(err)return console.error(err);
    else  console.log('ok do');
    fs.readFile('toni.doc',callbk);
};

// fs.rename('tony.txt','tony.doc', function(err,data){
//     if(err) return console.error(err);
//     console.log('done rename');
// });
console.log('is '+ __filename);