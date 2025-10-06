const Joi = require('joi');
const textSchema = Joi.object({
  text: Joi.string().min(10).required()
});

const validateRequest = (req, res, next) => {
  if (req.file) {
    return next();
  }
  if (req.body.text) {
    const { error } = textSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        reason: "Invalid text input",
        details: error.details[0].message
      });
      return next();
    }
  }

  next();
};
module.exports = validateRequest;