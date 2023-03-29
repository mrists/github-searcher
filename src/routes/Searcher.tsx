import { FC, useEffect, useState } from 'react';
import { UserService } from '../API/UserService';
import Input from '../components/UI/input/Input';
import UserList from '../components/UserList/UserList';
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
	}, [debouncedSearchTerm]);

	return (
		<div className='searcher'>
			<Input
				styleclass='searcher__input'
				value={userLogin}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserLogin(e.target.value.trim())}
				type='text'
				placeholder='Enter the user login...'
			/>
			<UserList
				error={error}
				fetched={fetched}
				users={users}
			/>
		</div>
	);
};

export default Searcher;
