const routes = require('express').Router();
const api = require('./api');

routes.use('/api', api);

routes.get('/', (req, res) => {
	res.status(200).json({
		message: 'This is index.'
	});
});

module.exports = routes;
