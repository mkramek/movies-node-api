require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const logger = require('../config/winston');
const routes = require('../routes');
const app = express();

app.use(morgan("combined", {
	stream: logger.stream
}));
app.use('/', routes);

app.listen(process.env.PORT || 3001, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
