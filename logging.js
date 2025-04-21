// logger.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' }),
    ],
});

module.exports = logger;

// app.js
const logger = require('./logger');

// Inside the error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.message); // Log the error message
    res.status(500).json({ error: 'Internal Server Error' });
});