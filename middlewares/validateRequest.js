const ApiError = require('../error/apiError');
const moongose = require('mongoose');

const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(ApiError.badRequest(error));
  }
};

// Validate if the id in url params is valid (mongoId)
const validateIsMongoId =
  (idName = 'id') =>
  (req, res, next) => {
    if (moongose.isValidObjectId(req.params[idName])) return next();
    next(ApiError.badRequest('Invalid id'));
  };

module.exports = { validateSchema, validateIsMongoId };
