import 'dotenv/config';

const express = require('express');
const morgan = require('morgan');
const logger = require('../config/winston');
const routes = require('../routes');
const app = express();

app.use(morgan({
	format: "combined",
	stream: logger.stream
}));
app.use('/', routes);

app.listen(process.env.APP_PORT, () => {
	console.log(`Listening on port ${process.env.APP_PORT}`);
});
