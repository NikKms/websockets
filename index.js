const { exec } = require('child_process');

const serverProcess = exec('cd server && yarn start || npm start ');

const clientProcess = exec('cd client && yarn run dev || npm run dev ');

serverProcess.on('error', (err) => {
	console.error('The error when starting the server:', err);
});

clientProcess.on('error', (err) => {
	console.error('The error when starting the client:', err);
});
