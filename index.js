var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var sockets = {};
io.on('connection', function(socket){
  socket.on('set_username',function(username){
    sockets[username] = socket;
  })

  socket.on('chat private', function(msg,to,from){
    sockets[to].emit('chat_private',msg);
    sockets[from].emit('chat_private',msg);
  });

  socket.on('chat public', function(msg){
    io.emit('chat_public', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});