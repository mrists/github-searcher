import { InputProps } from '../../../types/types';

function Input(props: InputProps) {
	return (
		<input
			className={props.styleClass}
			{...props}
		/>
	);
}

export default Input;
