import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Searcher from './routes/Searcher';
import UserDetails from './routes/UserDetails';
import './styles/App.scss';

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Layout />}
			>
				<Route
					index
					element={<Searcher />}
				/>
				<Route
					path='user/:id'
					element={<UserDetails />}
				/>
				<Route
					path='*'
					element={<Navigate to='/' />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
