var socket = io();

/* Sends the message to each connected user when form is submitted. */
$('form').submit(function(){
	socket.emit('chat message', $('#send').val());
    $('#send').val('');
    return false;
});

/* Capture the emitted message from the server and display it. */
socket.on('chat message', function(msg) {
	if (msg !== '') {
		$('#messages').append($('<li id="message">').text(msg));
		$("#chatWindow").scrollTop($("#chatWindow")[0].scrollHeight);
	}
});