require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const logger = require('../config/winston');
const routes = require('../routes');
const app = express();

app.set('view engine', 'ejs');
app.use(morgan("combined", {
	stream: logger.stream
}));
app.use('/', routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
