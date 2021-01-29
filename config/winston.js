const winston = require('winston');

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
		new winston.transports.File({
			filename: 'app_error.log',
			level: 'error'
		}),
		new winston.transports.Console(),
	],
});

logger.stream = {
	write: (message, encoding) => {
		logger.info(message);
	}
};

module.exports = logger;
