const httpStatus = require('http-status');
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 5,
  limit: 20,
  legacyHeaders: false,
  standardHeaders: true,
  message: {
    code: httpStatus.TOO_MANY_REQUESTS,
    message: 'Too many requests. Please try again later.',
  },
});

module.exports = rateLimiter;
