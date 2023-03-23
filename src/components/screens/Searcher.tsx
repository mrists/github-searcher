import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserService } from '../../API/UserService';
import { useFetching } from '../../hooks/useFetching';
import '../../styles/App.scss';
import { IUser } from '../../types/types';
import Input from '../UI/input/Input';
import User from '../User';
import UserList from '../UserList';

function Searcher() {
	const [users, setUsers] = useState<IUser[]>([]);
	const [userLogin, setUserLogin] = useState<string>('');
	const [fetched, setFetched] = useState<boolean>(false);

	const [fetchUsers, error] = useFetching(async () => {
		if (!userLogin) {
			setUsers([]);
			setFetched(false);
			return;
		}

		const response = await UserService.getUsers(userLogin);

		const { items } = response.data;

		setFetched(true);
		setUsers([...items]);
	});

	useEffect(() => {
		fetchUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userLogin]);

	return (
		<div className='searcher'>
			<Input
				styleClass='searcher__input'
				value={userLogin}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserLogin(e.target.value.trim())}
				type='text'
				placeholder='Enter the user login...'
			></Input>
			<UserList
				error={error}
				fetched={fetched}
				users={users}
				renderUsers={(user: IUser) => (
					<Link
						className='user-list__link'
						key={user.id}
						to={`user/${user.id}`}
					>
						<User
							avatar_url={user.avatar_url}
							login={user.login}
							id={user.id}
						></User>
					</Link>
				)}
			></UserList>
		</div>
	);
}

export default Searcher;
