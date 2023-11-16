import React, { useEffect, useState } from 'react';
import SideBar from './components/SideBar/SideBar';
import Body from './components/Body/Body';
import MessageDisplay from './components/MeassageDisplay/MessageDisplay';
import styles from './styles.module.css';

const ChatPage = ({ socket }) => {
	const [messages, setMessages] = useState([]);
	const [activeUsers, setActiveUsers] = useState([]);

	useEffect(() => {
		socket.on('response', (data) => {
			setMessages([...messages, data]);
		});
	}, [socket, messages]);

	return (
		<div className={styles.chat}>
			<SideBar
				socket={socket}
				activeUsers={activeUsers}
				setActiveUsers={setActiveUsers}
			/>
			<main className={styles.main}>
				<Body
					messages={messages}
					socket={socket}
					activeUsers={activeUsers}
					setActiveUsers={setActiveUsers}
				/>
				<MessageDisplay socket={socket} />
			</main>
		</div>
	);
};

export default ChatPage;
