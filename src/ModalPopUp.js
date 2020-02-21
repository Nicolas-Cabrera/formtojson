import React from 'react';
import './ModalPopUp.css';

export default function ModalPopUp(props) {

	if (props.togglemodal === true) {
		return (
			<div className='bg-modal'>
				<div className='modal-section'>
					<h2>User - Information</h2>
					<hr />
					<div className='section'>
						<p>&#123;</p>
						<div className='modal-code'>
							<p>{
								Object.keys(props.state).map(a => <p>"{a}": </p>)
							}</p>
							<p>{
								Object.values(props.state).map(a => <p>"{a}",</p>)
							}</p>
						</div>
						<p>&#125;</p>
					</div>
						<hr />
						<div className='button-section'>
							<button className='close' onClick={props.modalToggle}>CLOSE</button>
							<button className='save'  onClick={props.modalToggle}>SAVE CHANGES</button>
						</div>
					
				</div>
			</div>
		)
	} else {
		return <div className='nothing'>
			<h2>Nothing</h2>
		</div>
	}
}