var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* Use public folder for images, css and js */
app.use(express.static(__dirname + '/public'));

/* When home page is requested, send index.html */ 
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

/* Emit a 'chat message' function to each connected socket */
io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
})

/* Listen for connections on port 3000 */
http.listen(3000, function(){
  console.log('listening on *:3000');
});