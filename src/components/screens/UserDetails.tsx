import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserService } from '../../API/UserService';
import { useFetching } from '../../hooks/useFetching';
import { IRepository, User } from '../../types/types';
import RepositoriesList from '../RepositoriesList';
import Repository from '../Repository';
import Input from '../UI/input/Input';

function UserDetails() {
	const { id } = useParams();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [user, setUser] = useState<User | any>({});
	const [repositories, setRepositories] = useState([]);
	// Если типизировать как IRepository[], то ничего не выдает
	// const [searchedRepositories, setSearchedRepositories] = useState<IRepository[]>([]);
	const [fetchUser, errorUser] = useFetching(async () => {
		if (!id) return;

		const { data } = await UserService.getUserByID(id);

		setUser(data);
	});
	const [fetchRepositories, errorRepositories] = useFetching(async () => {
		const { data } = await UserService.getRepositories(user.login);

		setRepositories(data);
	});

	useEffect(() => {
		fetchUser();
		fetchRepositories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// useMemo(() => {
	// 	console.log('works');
	// 	searchRepository(searchedRepositoryQuery);
	// }, [searchedRepositoryQuery]);

	const searchedRepositories = useMemo(() => {
		if (!searchQuery) {
			return repositories;
		}
		const resultRepositories = repositories.filter((repository: IRepository) =>
			repository.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		return resultRepositories;
	}, [searchQuery, repositories]);

	function openUserBlog(e: React.MouseEvent, url: string) {
		e.preventDefault();
		const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
		const finalUrl = urlRegex.test(url) ? url : `https://${url}`;

		window.open(finalUrl, '_blank', 'noreferrer');
	}

	// function searchRepository(query: string) {
	// 	if (!query) {
	// 		console.log('repositories:', repositories);
	// 		setSearchedRepositories(repositories);
	// 		console.log('searchedRepositories', searchedRepositories);
	// 		return;
	// 	}
	// 	const resultRepositories = repositories.filter((repository: IRepository) =>
	// 		repository.name.toLowerCase().includes(query.toLowerCase())
	// 	);
	// 	setSearchedRepositories(resultRepositories);
	// }

	return (
		<>
			<div className='user-details'>
				{errorUser ? (
					<h3 className='user-details__error'>{errorUser}</h3>
				) : (
					<>
						<div className='user-info'>
							<div>
								<img
									className='user-info__img'
									src={user.avatar_url}
									alt={user.login}
								/>
							</div>
							<div className='user-info__description'>
								<p>User name: {user.login}</p>
								<p>Name: {user.name}</p>
								<p>
									Location: {user.location ? user.location : 'The user did not specify a location'}
								</p>
								<p>Followers: {user.followers}</p>
								<p>Following: {user.following}</p>
								<p>Company: {user.company ? `"${user.company}"` : "The user hasn't a company"}</p>
								<p>Public repositories: {user.public_repos}</p>
								<p>Public gists: {user.public_gists}</p>
							</div>
						</div>
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
								styleClass='user-details__input-item'
								type='text'
								value={searchQuery}
								placeholder="Search for User's Repositories"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setSearchQuery(e.target.value.trim())
								}
							></Input>
						</div>
						<div>
							<Link to={'/'}>
								<svg
									className='user-details__btn'
									width='25'
									height='25'
									viewBox='0 0 25 25'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<circle
										cx='12.5'
										cy='12.5'
										r='12.5'
										fill='#3E4491'
									/>
									<path
										d='M13.1656 12.4998L17.0804 8.58504C17.1577 8.49471 17.1981 8.3785 17.1936 8.25966C17.189 8.14081 17.1397 8.02807 17.0556 7.94397C16.9715 7.85987 16.8588 7.8106 16.7399 7.80601C16.6211 7.80142 16.5049 7.84185 16.4145 7.91921L12.4998 11.8339L8.58508 7.91449C8.49616 7.82557 8.37556 7.77561 8.24981 7.77561C8.12405 7.77561 8.00345 7.82557 7.91453 7.91449C7.82561 8.00341 7.77565 8.12401 7.77565 8.24977C7.77565 8.37552 7.82561 8.49612 7.91453 8.58504L11.834 12.4998L7.91453 16.4145C7.8651 16.4568 7.82495 16.5089 7.7966 16.5675C7.76826 16.6261 7.75233 16.6899 7.74982 16.7549C7.74731 16.82 7.75826 16.8848 7.782 16.9454C7.80575 17.006 7.84176 17.0611 7.88778 17.1071C7.9338 17.1531 7.98883 17.1891 8.04943 17.2128C8.11003 17.2366 8.17488 17.2475 8.23991 17.245C8.30495 17.2425 8.36876 17.2266 8.42735 17.1982C8.48593 17.1699 8.53803 17.1298 8.58036 17.0803L12.4998 13.1656L16.4145 17.0803C16.5049 17.1577 16.6211 17.1981 16.7399 17.1935C16.8588 17.1889 16.9715 17.1397 17.0556 17.0556C17.1397 16.9715 17.189 16.8587 17.1936 16.7399C17.1981 16.621 17.1577 16.5048 17.0804 16.4145L13.1656 12.4998Z'
										fill='#FFFDF5'
									/>
								</svg>
							</Link>
						</div>
					</>
				)}
			</div>
			<RepositoriesList
				repositories={searchedRepositories}
				error={errorRepositories}
				renderRepositories={(repository: IRepository) => (
					<Repository
						name={repository.name}
						forks={repository.forks}
						stargazers_count={repository.stargazers_count}
					></Repository>
				)}
			></RepositoriesList>
		</>
	);
}

export default UserDetails;
