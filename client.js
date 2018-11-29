var net = require('net');

var client = new net.Socket();

client.connect(1400,'127.0.0.1', function(){
    console.log('connected');
    client.write(' hai da am here')
});

client.on('data',function(data){
    console.log('server say: '+data);
    client.write(' repeat')
});