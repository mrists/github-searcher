import { FC } from 'react';
import { InputProps } from '../../../types/types';

const Input: FC<InputProps> = props => {
	return (
		<input
			className={props.styleclass}
			{...props}
		/>
	);
};

export default Input;
