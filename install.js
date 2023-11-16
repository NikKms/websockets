const { exec } = require('child_process');

const serverProcess = exec('cd server && yarn  || npm i ');

const clientProcess = exec('cd client && yarn  || npm i ');

serverProcess.on('error', (err) => {
	console.error('The error when installing the server:', err);
});

clientProcess.on('error', (err) => {
	console.error('The error when installing the client:', err);
});
