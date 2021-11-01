import React, { useReducer } from 'react';
import axios from 'axios';
import eventContext from './eventContext';
import eventReducer from './eventReducer';
import {
	GET_EVENTS,
	ADD_EVENT,
	DELETE_EVENT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_EVENT,
	FILTER_EVENTS,
	CLEAR_EVENTS,
	CLEAR_FILTER,
	EVENT_ERROR,
} from '../types';

const EventState = (props) => {
	const initialState = {
		events: null,
		current: null,
		filtered: null,
		error: null,
	};
	const [state, dispatch] = useReducer(eventReducer, initialState);
	// get events
	const getEvents = async () => {
		try {
			const res = await axios.get('/api/events');
			dispatch({ type: GET_EVENTS, payload: res.data });
		} catch (err) {
			dispatch({ type: EVENT_ERROR, payload: err.response.msg });
		}
	};

	// add event
	const addEvent = async (event) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post('/api/events', event, config);

			dispatch({ type: ADD_EVENT, payload: res.data });
		} catch (err) {
			dispatch({ type: EVENT_ERROR, payload: err.response.msg });
		}
	};
	// delete event
	const deleteEvent = async (id) => {
		try {
			await axios.delete(`/api/events/${id}`);

			dispatch({ type: DELETE_EVENT, payload: id });
		} catch (err) {
			dispatch({ type: EVENT_ERROR, payload: err.response.msg });
		}
	};
	// update event
	const updateEvent = async (event) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.put(`/api/events/${event._id}`, event, config);

			dispatch({ type: UPDATE_EVENT, payload: res.data });
		} catch (err) {
			dispatch({ type: EVENT_ERROR, payload: err.response.msg });
		}
	};
	// clear events
	const clearEvents = () => {
		dispatch({ type: CLEAR_EVENTS });
	};

	// set current event
	const setCurrent = (event) => {
		dispatch({ type: SET_CURRENT, payload: event });
	};
	// clear current event
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// filter events
	const filterEvent = (text) => {
		dispatch({ type: FILTER_EVENTS, payload: text });
	};
	// clear filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<eventContext.Provider
			value={{
				events: state.events,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				getEvents,
				addEvent,
				deleteEvent,
				setCurrent,
				clearCurrent,
				updateEvent,
				filterEvent,
				clearFilter,
				clearEvents,
			}}
		>
			{props.children}
		</eventContext.Provider>
	);
};

export default EventState;
