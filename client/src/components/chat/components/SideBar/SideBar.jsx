import React, { useEffect } from 'react';
import styles from './styles.module.css';

const SideBar = ({ socket, activeUsers, setActiveUsers }) => {
	useEffect(() => {
		const handleNewUser = (data) => {
			setActiveUsers(data);
		};

		const handleUserListUpdated = () => {
			socket.emit('getActiveUsers');
		};

		socket.on('responseNewUser', handleNewUser);
		socket.on('userListUpdated', handleUserListUpdated);

		return () => {
			socket.off('responseNewUser', handleNewUser);
			socket.off('userListUpdated', handleUserListUpdated);
		};
	}, [socket, activeUsers, setActiveUsers]);

	return (
		<div className={styles.sidebar}>
			<h4 className={styles.title}>Users</h4>
			<ul className={styles.usersList}>
				{activeUsers?.map((el) => (
					<li
						className={styles.user}
						key={el.socketID}>
						{el.user}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SideBar;
