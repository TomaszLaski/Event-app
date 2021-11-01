const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('event', EventSchema);
