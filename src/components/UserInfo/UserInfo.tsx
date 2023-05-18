import { FC } from 'react';
import { IUserInfoProps } from './types';

const UserInfo: FC<IUserInfoProps> = ({ user }) => {
	return (
		<div className='user-info'>
			<div className='user-info__img-folder'>
				<img
					className='user-info__img'
					src={user.avatar_url}
					alt={user.login}
				/>
			</div>
			<div className='user-info__description'>
				<p>User name: {user.login}</p>
				<p>Name: {user.name ? user.name : "Name isn't set"}</p>
				<p>Location: {user.location ? user.location : 'The user did not specify a location'}</p>
				<p>Followers: {user.followers}</p>
				<p>Following: {user.following}</p>
				<p>Company: {user.company ? `"${user.company}"` : "The user hasn't a company"}</p>
				<p>Public repositories: {user.public_repos}</p>
				<p>Public gists: {user.public_gists}</p>
			</div>
		</div>
	);
};

export default UserInfo;
