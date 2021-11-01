import React, { useContext, useRef, useEffect } from 'react';
import EventContext from '../../context/event/eventContext';

const EventFilter = () => {
	const eventContext = useContext(EventContext);
	const text = useRef('');
	const { filterEvent, clearFilter, filtered } = eventContext;

	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	});

	const onChange = (e) => {
		if (text.current.value !== '') {
			filterEvent(e.target.value);
		} else {
			clearFilter();
		}
	};

	return (
		<form>
			<input
				type='text'
				ref={text}
				placeholder='Filter Events...'
				onChange={onChange}
			/>
		</form>
	);
};

export default EventFilter;
