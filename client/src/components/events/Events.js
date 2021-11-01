import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import EventItem from './EventItem';
import EventContext from '../../context/event/eventContext';
import Spinner from '../layout/Spinner';

const Events = () => {
	const eventContext = useContext(EventContext);

	const { events, filtered, getEvents, loading } = eventContext;

	useEffect(() => {
		getEvents();
		// eslint-disable-next-line
	}, []);

	if (events !== null && events.length === 0 && !loading) {
		return <h4>Please add an event</h4>;
	}

	return (
		<Fragment>
			{events !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map((event) => (
								<CSSTransition key={event._id} timeout={500} classNames='item'>
									<EventItem event={event} />
								</CSSTransition>
						  ))
						: events.map((event) => (
								<CSSTransition key={event._id} timeout={500} classNames='item'>
									<EventItem event={event} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Events;
