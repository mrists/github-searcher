import { RepositoryProps } from '../types/types';

function Repository({ name, forks, stargazers_count }: RepositoryProps) {
	return (
		<div className='repositories-item'>
			<p className='repositories-item__name'>{name}</p>
			<div className='repositories-item__info'>
				<span>{forks}</span>
				<span>{stargazers_count}</span>
			</div>
		</div>
	);
}

export default Repository;
