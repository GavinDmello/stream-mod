var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8000);

app.get('/client1', function(req, res) {
    res.sendFile(__dirname + '/client.html');
});
app.get('/client2', function(req, res) {
    res.sendFile(__dirname + '/client1.html');
});
io.on('connection', function(socket) {
    socket.emit('news', { hello: 'world' });

    socket.on('something', function(data) {
        console.log("server side log",data)
        socket.emit('waitingforsomething', data);
    });
});
