const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Evnt = require('../models/Event');

//@route GET api/events
//@desc Get logged in user
//@access Public
router.get('/', auth, async (req, res) => {
	try {
		const events = await Evnt.find({ user: req.user.id }).sort({ date: -1 });
		res.json(events);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route POST api/events
//@desc Auth user & get token
//@access Private
router.post(
	'/',
	[
		auth,
		[
			check('name', 'First name is required').not().isEmpty(),
			check('surname', 'Last name is required').not().isEmpty(),
			check('email', 'Email is required').isEmail(),
			check('date', 'Date is required').isDate(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, surname, email, date } = req.body;
		try {
			const newEvent = new Evnt({
				name,
				surname,
				email,
				date,
				user: req.user.id,
			});

			const evnt = await newEvent.save();
			res.json(evnt);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//@route PUT api/events
//@desc Get logged in user
//@access Private
router.put('/:id', auth, async (req, res) => {
	const { name, surname, email, date } = req.body;
	// build event object
	const evntFields = {};
	if (name) evntFields.name = name;
	if (surname) evntFields.surname = surname;
	if (email) evntFields.email = email;
	if (date) evntFields.date = date;

	try {
		let evnt = await Evnt.findById(req.params.id);
		if (!evnt) return res.status(404).json({ msg: 'event not found' });
		// make sure user owns event
		if (evnt.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}
		evnt = await Evnt.findByIdAndUpdate(
			req.params.id,
			{ $set: evntFields },
			{ new: true }
		);
		res.json(evnt);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route DELETE api/events
//@desc Auth user & get token
//@access Public
router.delete('/:id', auth, async (req, res) => {
	try {
		let evnt = await Evnt.findById(req.params.id);
		if (!evnt) return res.status(404).json({ msg: 'event not found' });
		// make sure user owns event
		if (evnt.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}
		await Evnt.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Event removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
