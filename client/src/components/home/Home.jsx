import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Home = ({ socket }) => {
	const [user, setUser] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		localStorage.setItem('user', user);
		socket.emit('newUser', { user, socketID: socket.id });
		navigate('/chat');
	};

	const isButtonDisabled = user.trim() === '';
	return (
		<section className={styles.loginPage}>
			<form
				onSubmit={handleSubmit}
				className={styles.container}>
				<h2 className={styles.title}>Enter to chat</h2>
				<div className={styles.wrapper}>
					<label htmlFor="user" />
					<input
						type="text"
						id="user"
						placeholder="your name"
						value={user}
						onChange={(e) => {
							setUser(e.target.value);
						}}
					/>
					{!isButtonDisabled && (
						<button
							type="submit"
							className={styles.btn}>
							login
						</button>
					)}
				</div>
			</form>
		</section>
	);
};

export default Home;
