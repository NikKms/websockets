import { Route, Routes } from 'react-router-dom';
import socketIO from 'socket.io-client';
import Home from './components/home/home';
import ChatPage from './components/chat';

const URL = 'http://localhost:5000';
const socket = socketIO.connect(URL);

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<Home socket={socket} />}
				/>
				<Route
					path="/chat"
					element={<ChatPage socket={socket} />}
				/>
			</Routes>
		</>
	);
}

export default App;
