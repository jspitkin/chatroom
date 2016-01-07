var socket = io();
var username;
var usernameSet = false;

/* Sends the message to each connected user when form is submitted. */
$('#sendForm').submit(function() {
	socket.emit('chat message', $('#send').val());
    $('#send').val('');
    return false;
});

$('#userForm').submit(function() {
	
	return false;
});

/* Capture the emitted message from the server and display it. */
socket.on('chat message', function(msg) {
	if (msg !== '' && usernameSet) {
		$('#messages').append($('<li id="message">').text(username + ": " + msg));
		$("#chatWindow").scrollTop($("#chatWindow")[0].scrollHeight);
	} 
	else if (!usernameSet) {
		$('#send').val('who are you lol');
	}
});



socket.on('user disconnect', function(user) {
	$('#messages').append($('<li id="message">').text(user + " has left."));
});

$('#sendName').on('click', function() {
	username = $('#name').val().trim();
	validUsername();
});

/* validates username entry */
function validUsername() {
	if (username !== '' && username.length < 8 && !usernameSet) {
		$('#users').append($('<li id="user">').text(username));
		$('#name').val('');
		usernameSet = true;
	} 
	else if (username.length < 1) {
		$('#name').val('');
	}
	else if (usernameSet) {
		$('#name').val('no redos lol');
	}
	else {
		$('#name').val('8 char limit lol');
	}
}