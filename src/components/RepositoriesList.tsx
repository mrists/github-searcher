import { RepositoriesListProps } from '../types/types';

function RepositoriesList({ repositories, renderRepositories, error }: RepositoriesListProps) {
	return (
		<div className='repositories'>
			{repositories.length ? (
				repositories.map(renderRepositories)
			) : (
				<h3 className='repositories__not-found'>No repositories found</h3>
			)}
			{error && !repositories.length && <h3 className='user-list__not-found'>{error}</h3>}
		</div>
	);
}

export default RepositoriesList;
