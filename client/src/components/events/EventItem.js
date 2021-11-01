import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EventContext from '../../context/event/eventContext';

const EventItem = ({ event }) => {
	const eventContext = useContext(EventContext);
	const { deleteEvent, setCurrent, clearCurrent } = eventContext;

	const { _id, name, email, surname, date } = event;

	const onDelete = () => {
		deleteEvent(_id);
		clearCurrent();
	};

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{`${name} ${surname}`}
				<span style={{ float: 'right' }} className='badge badge-success'>
					{date.split('T')[0]}
				</span>
			</h3>
			<ul className='list'>
				{email && (
					<li>
						<i className='fas fa-envelope-open'></i>
						{email}
					</li>
				)}
			</ul>
			<p>
				<button
					className='btn btn-dark btn-sm'
					onClick={() => setCurrent(event)}
				>
					Edit
				</button>
				<button className='btn btn-danger btn-sm' onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

EventItem.propTypes = {
	event: PropTypes.object.isRequired,
};

export default EventItem;
