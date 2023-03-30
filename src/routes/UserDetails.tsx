import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserService } from '../API/UserService';
import RepositoriesList from '../components/RepositoriesList';
import Input from '../components/UI/input/Input';
import UserInfo from '../components/UserInfo';
import { useDebounce } from '../hooks/useDebounce';
import { useRepos } from '../hooks/useRepos';
import { IRepository, User } from '../types/types';

const UserDetails: FC = () => {
	const { id } = useParams<string>();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isRepositoriesLoading, setIsRepositoriesLoading] = useState<boolean>(true);
	const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
	const [user, setUser] = useState<User | any>({});
	const [repositories, setRepositories] = useState<IRepository[]>([]);
	const [errors, setErrors] = useState<Error | any>({ user: '', repositories: '' });
	const fetchUserAndRepositories = () => {
		if (!id) return;

		UserService.getUserByID(id)
			.then(({ data }) => {
				setUser(data);
				setErrors({ ...errors, user: '' });
				UserService.getRepositories(data.login)
					.then(({ data }) => {
						console.log(data);
						setRepositories(data);
						setErrors({ ...errors, repositories: '' });
					})
					.catch((error: unknown) => {
						setErrors({ ...errors, repositories: (error as Error).message });
					})
					.finally(() => {
						setIsRepositoriesLoading(false);
					});
			})
			.catch((error: unknown) => {
				setErrors({ ...errors, user: (error as Error).message });
			});
	};

	useEffect(() => {
		fetchUserAndRepositories();
	}, []);

	const searchedRepositories = useRepos(repositories, debouncedSearchQuery);

	function openUserBlog(e: React.MouseEvent, url: string) {
		e.preventDefault();
		const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
		const finalUrl = urlRegex.test(url) ? url : `https://${url}`;

		window.open(finalUrl, '_blank', 'noreferrer');
	}

	return (
		<>
			<div className='user-details'>
				{errors.user ? (
					<h3 className='user-details__error'>{errors.user}</h3>
				) : (
					<>
						<UserInfo user={user} />
						<div className='user-details__link'>
							{user.blog ? (
								<a
									onClick={e => openUserBlog(e, user.blog)}
									href={user.blog}
								>
									{user.blog}
								</a>
							) : (
								<p>User hasn't own blog</p>
							)}
						</div>
						<div className='user-details__input'>
							<Input
								styleclass='user-details__input-item'
								type='text'
								value={searchQuery}
								placeholder="Search for User's Repositories"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setSearchQuery(e.target.value.trim())
								}
							/>
						</div>
						<div>
							<Link to={'/'}>
								<img
									className='user-details__btn'
									src={process.env.PUBLIC_URL + '/images/button.png'}
									alt=''
								/>
							</Link>
						</div>
					</>
				)}
			</div>
			<RepositoriesList
				repositories={searchedRepositories}
				isRepositoriesLoading={isRepositoriesLoading}
				error={errors.repositories}
			/>
		</>
	);
};

export default UserDetails;
