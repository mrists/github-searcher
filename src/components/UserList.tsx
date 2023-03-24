import { FC } from 'react';
import { UserListProps } from '../types/types';

const UserList: FC<UserListProps> = ({ users, renderUsers, fetched, error }) => {
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
