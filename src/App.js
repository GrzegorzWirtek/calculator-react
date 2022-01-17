import './App.css';
import React from 'react';
import Button from './components/Button';
import Input from './components/Input';
import { evaluate } from 'mathjs';

class App extends React.Component {
	state = {
		inputValue: '',
		currentButton: null,
		currentSymbol: '',
		isComa: false,
	};
	keypad = [1, 2, 3, 'C', 4, 5, 6, '+', '-', 7, 8, 9, '*', '/', '.', 0, '='];

	handleMouseDown = (e) => {
		const text = e.target.textContent;
		this.setState({
			currentButton: text,
		});
	};

	handleMouseUp = (e) => {
		let text = e.target.textContent;
		const curSymb = this.state.currentSymbol;
		let value = null;
		let coma = false;
		if (
			text === '+' ||
			text === '-' ||
			text === '*' ||
			text === '/' ||
			text === '.'
		) {
			coma = this.state.isComa;
			if (this.state.inputValue === '') {
				value = '';
			} else if (text === curSymb) {
				value = this.state.inputValue;
			} else if (text === '.') {
				coma = true;
				if (this.state.isComa) value = this.state.inputValue;
				else value = this.state.inputValue + text;
			} else {
				const lastSign = [...this.state.inputValue].pop(1);
				if (
					lastSign === '+' ||
					lastSign === '-' ||
					lastSign === '*' ||
					lastSign === '/'
				) {
					value = this.state.inputValue.slice(0, -1) + text;
				} else {
					value = this.state.inputValue + text;
				}
			}
		} else if (text === 'C') {
			text = '';
			value = '';
			coma = false;
		} else if (text === '=') {
			const lastChar = this.state.inputValue[this.state.inputValue.length - 1];
			coma = this.state.isComa;
			if (
				lastChar === '+' ||
				lastChar === '-' ||
				lastChar === '*' ||
				lastChar === '/'
			) {
				value = this.state.inputValue;
			} else if (this.state.inputValue === '') {
				value = '';
			} else value = evaluate(this.state.inputValue).toString();
		} else {
			coma = this.state.isComa;
			value = this.state.inputValue + text;
		}

		this.setState({
			currentButton: null,
			currentSymbol: text,
			inputValue: value,
			isComa: coma,
		});
	};

	handleInputChange = (e) => {
		console.log(e.target.value);
	};

	render() {
		console.log(this.state.isComa);
		let itemClass = 'key';
		const keys = this.keypad.map((key) => {
			if (key.toString() === this.state.currentButton) {
				itemClass = 'key key--active';
			} else itemClass = 'key';
			return (
				<Button
					key={key}
					content={key}
					className={itemClass}
					keyDown={this.handleMouseDown}
					keyUp={this.handleMouseUp}
				/>
			);
		});
		return (
			<div className='wrapper'>
				<Input value={this.state.inputValue} change={this.handleInputChange} />
				{keys}
			</div>
		);
	}
}

export default App;
