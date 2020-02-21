import React from 'react';

export default class AutoComplete extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			suggestions: [],
			text: '',
		};
	}

	onTextChanged = (e) => {
		const  { items } = this.props
		const value = e.target.value;
		let suggestions = [];
		if(value.length > 0) {
			const regex = new RegExp(`^${value}`, 'i');
			suggestions = items.sort().filter(v => regex.test(v))
		}
		this.setState(() => ({ suggestions, text: value }));
	}

	renderSuggestions() {
		const { suggestions } = this.state;
		if(suggestions.length === 0) {
			return null;
		} 
		return (
			<ul>
				{suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
			</ul>
		)
	}

	suggestionSelected(value) {
		this.setState(() => ({
			text: value,
			suggestions: [],
		})) 
	}

	render () {
		const { text } = this.state;
 		return (
			<div className='AutoCompleteText'>
				<input value={text} name='country' onChange={this.onTextChanged} placeholder='Select Country *' type='text' />
				{this.renderSuggestions()}
				{this.props.setCountry(text)}
			</div>
		)
	}
}