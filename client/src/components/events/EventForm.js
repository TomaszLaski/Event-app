import React, { useContext, useState, useEffect } from 'react';
import EventContext from '../../context/event/eventContext';

const EventForm = () => {
	const eventContext = useContext(EventContext);

	const { addEvent, updateEvent, clearCurrent, current } = eventContext;

	useEffect(() => {
		if (current !== null) {
			setEvent(current);
		} else {
			setEvent({
				name: '',
				surname: '',
				email: '',
				date: '',
			});
		}
	}, [eventContext, current]);

	const [event, setEvent] = useState({
		name: '',
		surname: '',
		email: '',
		date: '',
	});

	const { name, surname, email, date } = event;

	const onChange = (e) =>
		setEvent({ ...event, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		if (current === null) {
			addEvent(event);
		} else {
			updateEvent(event);
		}
		clearAll();
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>{current ? 'Update Event' : 'Add Event'}</h2>
			<input
				type='text'
				placeholder='name'
				name='name'
				value={name}
				onChange={onChange}
			></input>
			<input
				type='text'
				placeholder='surname'
				name='surname'
				value={surname}
				onChange={onChange}
			></input>
			<input
				type='text'
				placeholder='Email'
				name='email'
				value={email}
				onChange={onChange}
			></input>
			<input
				type='date'
				placeholder='date'
				name='date'
				value={date.split('T')[0]}
				onChange={onChange}
			/>
			<div>
				<input
					type='submit'
					value={current ? 'Update Event' : 'Add Event'}
					className='btn btn-primary btn-block'
				></input>
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default EventForm;
