var fs = require('fs');
var data = fs.readFileSync('toni.txt');
console.log(data.toString());
console.log('end');