const api = require('express').Router();
const movies = require('./movies');
const comments = require('./comments');

api.get('/', (req, res) => {
	res.status(200).json({
		message: 'Connected to API!'
	});
});

api.use('/movies', movies);
api.use('/comments', comments);

module.exports = api;
