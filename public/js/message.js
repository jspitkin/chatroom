var socket = io();
//var username;
var usernameSet = false;

/* Sends the message to each connected user when form is submitted. */
$('#sendForm').submit(function() {
	socket.emit('chat message', socket.username + ": " + $('#send').val());
	$('#send').val('');
    return false;
});

/* Capture the emitted message from the server and display it. */
socket.on('chat message', function(msg) {
	if (msg !== '' && usernameSet) {
		$('#messages').append($('<li id="message">').text(msg));
		$("#chatWindow").scrollTop($("#chatWindow")[0].scrollHeight);
	} 
	else if (!usernameSet) {
		$('#send').val('who are you lol');
	}
});

socket.on('user disconnect', function(user, users) {
	if(user !== null && users !== null)
	{
		$('#messages').append($('<li id="join">').text(user + " has left the room"));
		$('#users').empty();
		for(var u in users){
    		$('#users').append($('<li id="user">').text(users[u]));
		}
	}
});

$('#sendName').on('click', function() {
	if (!usernameSet) {
		socket.username = $('#name').val().trim();
	}
	validUsername();
});

/* updates list when a user first enters the room */
socket.on('join room', function(users) {
	$('#users').empty();
	for(var u in users){
    	$('#users').append($('<li id="user">').text(users[u]));
	}	
	$("#chatWindow").scrollTop($("#chatWindow")[0].scrollHeight);
	$("#users").scrollTop($("#users")[0].scrollHeight);
});

/* alerts users when someone new joins the room */
socket.on('update users', function(user, users) {
	$('#messages').append($('<li id="join">').text(user + " has joined the room"));
	$('#users').empty();
	for(var u in users){
    	$('#users').append($('<li id="user">').text(users[u]));
	}	
	$("#chatWindow").scrollTop($("#chatWindow")[0].scrollHeight);
	$("#users").scrollTop($("#users")[0].scrollHeight);
});	

/* validates username entry and tells users a new member has joined if the name is good */
function validUsername() {
	if (socket.username !== '' && socket.username.length < 9 && !usernameSet) {
		$('#users').append($('<li id="user">').text(socket.username));
		$("#users").scrollTop($("#users")[0].scrollHeight);
		$('#name').val('');
		usernameSet = true;
		$('#sendName').remove();
		$('#name').val(socket.username);
		$('#name').prop("readonly", true);
		socket.emit('update users', socket.username);
	} 
	else if (socket.username.length < 1) {
		$('#name').val('');
	}
	else {
		$('#name').val('8 char limit lol');
	}
}