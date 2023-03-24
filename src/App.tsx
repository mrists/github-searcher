import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Searcher from './routes/Searcher';
import UserDetails from './routes/UserDetails';
import './styles/App.scss';

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Layout></Layout>}
			>
				<Route
					index
					element={<Searcher></Searcher>}
				></Route>
				<Route
					path='user/:id'
					element={<UserDetails></UserDetails>}
				></Route>
				<Route
					path='*'
					element={<Navigate to='/' />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
