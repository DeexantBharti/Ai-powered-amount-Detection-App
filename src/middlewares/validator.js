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

  // neither a file nor a valid text
  return res.status(400).json({
    status: "error",
    reason: "bad requesst",
    details: "Request must contain either a image file or the raw text in formatted json"
  });
};
module.exports = validateRequest;