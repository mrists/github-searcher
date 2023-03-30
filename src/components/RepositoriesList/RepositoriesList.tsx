import { FC } from 'react';
import { IRepository } from '../../types/types';
import Repository from './components/Repository/Repository';
import { RepositoriesListProps } from './types';

const RepositoriesList: FC<RepositoriesListProps> = ({
	repositories,
	error,
	isRepositoriesLoading,
}) => {
	const renderRepositories = (repository: IRepository): React.ReactNode => {
		return (
			<Repository
				key={repository.id}
				name={repository.name}
				forks={repository.forks}
				stargazers_count={repository.stargazers_count}
				html_url={repository.html_url}
			/>
		);
	};

	return (
		<div className='repositories'>
			{repositories.length ? (
				repositories.map(renderRepositories)
			) : isRepositoriesLoading ? (
				<h3 className='repositories__loading'>Repositories loading...</h3>
			) : error ? (
				<h3 className='user-list__not-found'>{error}</h3>
			) : (
				<h3 className='repositories__not-found'>No repositories found</h3>
			)}
		</div>
	);
};

export default RepositoriesList;
