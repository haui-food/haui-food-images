const httpStatus = require('http-status');

const env = require('../config');

const errorHandler = (err, req, res, next) => {
  let status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error.';

  if (err.message === 'File too large') {
    status = httpStatus.REQUEST_ENTITY_TOO_LARGE;
    message = `File size exceeds ${env.maxFileSize}MB.`;
  }

  if (err.message === 'Unexpected field') {
    status = httpStatus.BAD_REQUEST;
    message = 'Only one file is allowed to be converted.';
  }

  res.status(status).send({
    code: status,
    message,
  });
};

module.exports = errorHandler;
