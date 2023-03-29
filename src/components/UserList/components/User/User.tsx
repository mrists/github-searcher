import { FC } from 'react';
import { UserProps } from './types';

const User: FC<UserProps> = ({ login, avatar_url, id }) => {
	return (
		<div className='user-item'>
			<img
				src={avatar_url}
				alt={avatar_url}
				className='user-item__img'
			/>
			<p className='user-item__login'>{login}</p>
			<div className='user-item__id'>
				<span>Repo:</span>
				<span>{id}</span>
			</div>
		</div>
	);
};

export default User;
