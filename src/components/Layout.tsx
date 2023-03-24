import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
	return (
		<>
			<header className='header'>
				<h1>GitHub Searcher</h1>
			</header>
			<Outlet></Outlet>
		</>
	);
};

export default Layout;
