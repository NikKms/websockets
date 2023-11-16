import React, { useState } from 'react';
import styles from './styles.module.css';

const MessageDisplay = ({ socket }) => {
	const [msg, setMsg] = useState('');

	const handleSend = (e) => {
		e.preventDefault();
		if (msg.trim() && localStorage.getItem('user')) {
			socket.emit('message', {
				text: msg,
				name: localStorage.getItem('user'),
				id: `${socket.id}`,
				socketID: socket.id,
				date: new Date().toLocaleTimeString('en-US', {
					hour12: false,
					hour: 'numeric',
					minute: 'numeric',
				}),
			});
		}
		setMsg('');
	};

	return (
		<div className={styles.displayMsg}>
			<form onSubmit={handleSend}>
				<input
					type="text"
					className={styles.msgInput}
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
				/>
				<button
					type="submit"
					className={styles.btnDisplay}>
					send
				</button>
			</form>
		</div>
	);
};

export default MessageDisplay;
