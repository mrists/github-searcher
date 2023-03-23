import { UserProps } from '../types/types'

function User({ login, avatar_url, id }: UserProps) {
	return (
		<div className='user-item'>
			<img src={avatar_url} alt={avatar_url} className='user-item__img' />
			<p className='user-item__login'>{login}</p>
			<div className='user-item__id'>
				<span>Repo:</span>
				<span>{id}</span>
			</div>
		</div>
	)
}

export default User
