import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import styles from './styles.module.css';

const Body = ({ messages, socket, setActiveUsers }) => {
	const navigate = useNavigate();

	const handleLeaveChat = () => {
		socket.emit('logOut', socket.id);
		localStorage.removeItem('user');
		setActiveUsers((prevActiveUsers) =>
			prevActiveUsers.filter((user) => user.socketID !== socket.id),
		);
		navigate('/');
	};

	return (
		<>
			<header className={styles.header}>
				<button className={styles.modalBtn}>contacts</button>
				<h3>{localStorage.getItem('user')}</h3>
				<button
					type="button"
					className={styles.btnHeader}
					onClick={handleLeaveChat}>
					Leave chat
				</button>
			</header>

			<div className={styles.container}>
				{messages.map((el) =>
					el.name === localStorage.getItem('user') ? (
						<div
							className={styles.chatMsg}
							key={nanoid()}>
							<p className={styles.owner}>You</p>
							<div className={styles.sender}>
								<p className={styles.text}>{el.text}</p>
								<p className={styles.date}>{el.date}</p>
							</div>
						</div>
					) : (
						<div
							className={styles.chatMsg}
							key={nanoid()}>
							<p className={styles.guest}>{el.name}</p>
							<div className={styles.recipient}>
								<p className={styles.text}>{el.text}</p>
								<p className={styles.date}>{el.date}</p>
							</div>
						</div>
					),
				)}
			</div>
		</>
	);
};

export default Body;
