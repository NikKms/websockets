const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');

const PORT = 5000;

const socketIO = require('socket.io')(http, {
	cors: { origin: 'http://localhost:5173' },
});

app.get('/api', (req, res) => {
	res.json({ message: 'Hello' });
});

let users = [];

socketIO.on('connection', (socket) => {
	console.log(`user ${socket.id} connected`);

	socket.on('newUser', (data) => {
		users.push(data);
		socketIO.emit('responseNewUser', users);
		console.log(`${data.user} enter to chat`);
	});

	socket.on('message', (data) => {
		socketIO.emit('response', data);
	});

	socket.on('updList', (data) => {
		const updatedList = users.filter((user) => user.socketID !== data);
		socketIO.emit('responseNewUser', updatedList);
	});

	socket.on('logOut', (data) => {
		const indexToRemove = users.findIndex((el) => el.socketID === data);

		if (indexToRemove !== -1) {
			users.splice(indexToRemove, 1);
			socketIO.emit('updList', users);
		}
	});

	socket.on('disconnect', () => {
		console.log(`user ${socket.id} disconnect`);

		const indexToRemove = users.findIndex((el) => el.socketID === socket.id);

		if (indexToRemove !== -1) {
			users.splice(indexToRemove, 1);
		}
	});
});

http.listen(PORT, () => {
	console.log('Server working', `port ${PORT}`);
});
