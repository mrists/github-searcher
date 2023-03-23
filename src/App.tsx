import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Searcher from './components/screens/Searcher'
import UserDetails from './components/screens/UserDetails'
import './styles/App.scss'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout></Layout>}>
				<Route index element={<Searcher></Searcher>}></Route>
				<Route path='user/:id' element={<UserDetails></UserDetails>}></Route>
			</Route>
		</Routes>
	)
}

export default App
