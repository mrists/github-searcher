import { FC } from 'react';
import { RepositoryProps } from './types';

const Repository: FC<RepositoryProps> = ({ name, forks, stargazers_count, html_url }) => {
	return (
		<a
			href={html_url}
			target='_blank'
			className='repositories-item'
		>
			<p className='repositories-item__name'>{name}</p>
			<div className='repositories-item__info'>
				<span>{forks}</span>
				<span>{stargazers_count}</span>
			</div>
		</a>
	);
};

export default Repository;
