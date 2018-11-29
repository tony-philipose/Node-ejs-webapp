var events = require('events');
//console.log(events);
var eventEmiter = new events.EventEmitter();
//console.log(eventEmiter);

var l1 = function l1(){
   console.log("l1 is executed");  
};

var l2 = function l2(){
    console.log("l2 is executed");
};



eventEmiter.on('e',l1);

eventEmiter.emit('connection');
eventEmiter.addListener('e',l2);
eventEmiter.emit('e');

eventEmiter.addListener('o' ,function(a){
    console.log('a is '+a);
});
eventEmiter.emit('o',44);

eventEmiter.once('1', function(){
    console.log('on');
    function a(){
        console.log('a');
    }
    function b(){
        console.log('b');
        a();
    }
    b();
});
var count = require('events').EventEmitter.listenerCount(eventEmiter,'1');
console.log(count);
eventEmiter.emit('1');
eventEmiter.emit('1');
