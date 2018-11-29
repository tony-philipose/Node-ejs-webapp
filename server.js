var net = require('net');
var ip = process.stdin;

var server = net.createServer(function(socket){

    socket.on('data', function(data1){
        console.log('client: '+ data1);
        ip.on('data', function(data2){
            socket.write(data2);
        });
    });

    // socket.on('close', function(data){
    //     console.log("closed");
    // });
    
});
server.listen(1500,'127.0.0.1');