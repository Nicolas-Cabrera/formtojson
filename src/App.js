import React, { useState } from 'react';
import ModalPopUp from './ModalPopUp';
import './App.css';
import './AutoComplete';
import countries from './countries';
import AutoComplete from './AutoComplete';

function App() {

	const [ country, setCountry] = useState('');
	const [state, setState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		gender: "",
		Phonenumber: "",
		country: country,
		city: "",
		InitialDate: "",
		finalDate: "",
	})
	const [ requirederror, setRequiredError ] = useState('');
	const [ emailerror, setEmailError ] = useState('');
	const [ dateerror, setDateError ] = useState('');
	const [ togglemodal, setToggleModal ] = useState(false);

	function handleSubmit(e) {
		console.log(`The country is ${state.country}`);
		e.preventDefault();

		if (state.firstName === '' || state.lastName === '' || state.Phonenumber === '' || state.country === '' || state.city === '' || state.finalDate === '') {
			setRequiredError('Required');
		} else if (state.email === '') {
			setEmailError('Required');
		} else if (!state.email.includes('@') && !state.email.includes('.com')) {
			setEmailError('Invalid Email');
		} else if (state.InitialDate === '') {
			setDateError('Required');
		} else if (Date.parse(state.InitialDate) > Date.parse(state.finalDate)) {
			setDateError('Initial date must not be greater than final date and viceversa');
		} else {
			setToggleModal(!togglemodal);
			setRequiredError('');
			setEmailError('');
			setDateError('');
		}

		console.log(state);
	}

	function handleChange(e) {
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value
		});

		return state.country = country;
	}

	function modalToggle(e) {
		e.preventDefault();
		setToggleModal(!togglemodal);
		console.log(togglemodal);
	}

	function clearForm(e) {
		setState({
			firstName: "",
			lastName: "",
			email: "",
			gender: "",
			Phonenumber: "",
			country: "",
			city: "",
			InitialDate: "",
			finalDate: ""
		})
	}

	return (
		<div>
			<div className="App">
				<div className='form'>
					<h1>Form</h1>
					<form>
						<input className='first-half-input' name='firstName' onChange={handleChange} type='text' placeholder='First Name *'></input>
						<input className='second-half-input' name='lastName' onChange={handleChange} type='text' placeholder='Last Name *'></input><br />
						<div className='error'>{requirederror}</div>
						<div className='error-lastname'>{requirederror}</div>
						<input className='full-input' name='email' onChange={handleChange} type='text' placeholder='Email *'></input>
						<div className='error'>{emailerror}</div>
						<label className='gender-label'>Gender</label><br />
						<input type='radio' name="gender" value='Male' onChange={handleChange}></input><label>Male</label>
						<input type='radio' name='gender' value='Female' onChange={handleChange}></input><label>Female</label><br />
						<input className='full-input' name='Phonenumber' onChange={handleChange} type='number' placeholder='Phone number *'></input><br />
						<div className='error'>{requirederror}</div>
						<AutoComplete setCountry={setCountry} items={countries} />
						<input className='full-input' name='country' onChange={handleChange} placeholder='Select Country'></input><br />
						<div className='error'>{requirederror}</div>
						<input className='full-input' name='city' onChange={handleChange} placeholder='Select City'></input><br />
						<div className='error'>{requirederror}</div>
						<input type='date' name='InitialDate' onChange={handleChange} className='first-half-input' placeholder='Initial Date *'></input>
						<input type='date' name='finalDate' onChange={handleChange} className='second-half-input' placeholder='Final Date *'></input>
						<div className='error'>{dateerror}</div>
						<div className='error-right'>{requirederror}</div>
						<button onClick={(e) => clearForm(e)} className='reset'>RESET</button>
						<button onClick={(e) => handleSubmit(e)} className='submit'>SUBMIT</button>
					</form>
				</div>
				<div className='result'>
					<h1>User Information</h1>
					<div className='right'>
						<p>&#123;</p>
						<div className='code'>
							<p>{
								Object.keys(state).map(a => <p>"{a}": </p>)
							}</p>
							<p>{
								Object.values(state).map(a => <p>"{a}",</p>)
							}</p>
						</div>
						<p>&#125;</p>
					</div>
				</div>
			</div>
			<div className='modal'>
				<ModalPopUp state={state} togglemodal={togglemodal} modalToggle={modalToggle}/>
			</div>

		</div>
	);
}

export default App;
