import { Outlet } from 'react-router-dom'

function Layout() {
	return (
		<>
			<header className='header'>
				<h1>GitHub Searcher</h1>
			</header>
			<Outlet></Outlet>
		</>
	)
}

export default Layout
