import './Button.css';

const Button = (props) => (
	<button
		className={props.className}
		onMouseDown={props.keyDown}
		onMouseUp={props.keyUp}>
		{props.content}
	</button>
);

export default Button;
