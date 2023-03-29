import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../types/types';
import User from './components/User/User';
import { UserListProps } from './types';

const UserList: FC<UserListProps> = ({ users, fetched, error }) => {
	const renderUsers = (user: IUser): React.ReactNode => (
		<Link
			className='user-list__link'
			key={user.id}
			to={`user/${user.id}`}
		>
			<User
				avatar_url={user.avatar_url}
				login={user.login}
				id={user.id}
			/>
		</Link>
	);
	return (
		<div className='user-list'>
			{users.length ? (
				users.map(renderUsers)
			) : fetched ? (
				<h3 className='user-list__not-found'>No user found</h3>
			) : (
				<></>
			)}
			{error && !users.length && <h3 className='user-list__not-found'>{error}</h3>}
		</div>
	);
};

export default UserList;
