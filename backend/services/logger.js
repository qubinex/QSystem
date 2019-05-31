const winston = require("winston");
require('winston-daily-rotate-file');

const level = process.env.LOG_LEVEL || 'debug';

const transport = new (winston.transports.DailyRotateFile)({
  filename: './logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  )
  // maxSize: '20m',
});

const logger = winston.createLogger({
  transports: [
    transport,
  ]
});

logger.stream = {
  write: function(message, encoding){
      logger.info(message);
      console.log(message);
  },
  error: function(message, encoding) {
    logger.error(message);
    console.log(message)
  }
};

module.exports = logger;