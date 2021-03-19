const validateBodySchema = require('../utils/validatorSchema');

const validate = (req, res, next) => {
  const { error } = validateBodySchema(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });
  }
  return next();
};

module.exports = validate;
