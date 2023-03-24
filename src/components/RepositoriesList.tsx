import { FC } from 'react';
import { RepositoriesListProps } from '../types/types';

const RepositoriesList: FC<RepositoriesListProps> = ({
	repositories,
	renderRepositories,
	error,
	isRepositoriesLoading,
}) => {
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
