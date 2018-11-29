module.exports.area = function (obj1){
    console.log('------------ function----------');
    var pi = 3.14;
    function calc(){
    var r = pi*obj1*obj1;
    return r;
    }return {calc : calc}
};
//module.exports = area;
module.exports.hai = function(){
  
    return 'hai..';
};
function hlo(){
    return 'hlo';
};
module.exports = hlo;