// Guide reference for some things
// https://github.com/wmora/nodejs-express-socketio-chatroom/blob/master/server.js

var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);

  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.post('/message', function(req, res) {
  io.sockets.emit('incomingMessage', {
    message: req.body.text,
    user: req.body.id
  });
});

io.on('connected', function(socket) {
  // socket.on('teste', function(data) {
  //   console.log(data);
  // });
});

server.listen(3333);
