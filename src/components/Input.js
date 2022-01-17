import './Input.css';

const Input = (props) => (
	<input type='text' onChange={props.change} value={props.value} />
);

export default Input;
