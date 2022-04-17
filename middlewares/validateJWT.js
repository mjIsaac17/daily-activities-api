const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

// Validate if token is valid
const validateToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) {
        return next(ApiError.invalidToken('Invalid token'));
      }
      req.user = user;
      next();
    });
  } else next(ApiError.invalidToken('You are not authenticated'));
};

module.exports = { validateToken };
