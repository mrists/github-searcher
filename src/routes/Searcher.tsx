import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserService } from '../API/UserService';
import Input from '../components/UI/input/Input';
import User from '../components/User';
import UserList from '../components/UserList';
import { useDebounce } from '../hooks/useDebounce';
import { useFetching } from '../hooks/useFetching';
import '../styles/App.scss';
import { IUser } from '../types/types';

const Searcher: FC = () => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [userLogin, setUserLogin] = useState<string>('');
	const debouncedSearchTerm = useDebounce<string>(userLogin, 500);
	const [fetched, setFetched] = useState<boolean>(false);

	const [fetchUsers, error] = useFetching(async () => {
		if (!userLogin) {
			setUsers([]);
			setFetched(false);
			return;
		}

		const { data } = await UserService.getUsers(userLogin);

		const { items } = data;

		setFetched(true);
		setUsers([...items]);
	});

	useEffect(() => {
		fetchUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm]);

	return (
		<div className='searcher'>
			<Input
				styleclass='searcher__input'
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
};

export default Searcher;
