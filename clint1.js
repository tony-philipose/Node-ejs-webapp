var net = require('net');
var ip = process.stdin;
var client = new net.Socket();

client.connect(1500,'127.0.0.1', function(){
    console.log('connected');
    //client.write(' hai da am clint 2')
    ip.on('data', function(data1){
        client.write(data1);
    });
});

client.on('data',function(data2){
    console.log('server: '+data2);
});