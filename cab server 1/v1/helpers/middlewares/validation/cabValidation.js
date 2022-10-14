const Joi = require("joi");

function validateCab(req, res, next) {
  const cabSc = Joi.object({
    type: Joi.string().min(2).max(20).required(),
    seats: Joi.number().min(1).max(100).required(),
    rate: Joi.number().min(0),
    ac: Joi.boolean(),
    avatar: Joi.string(),
    status: Joi.number().min(0).max(5),
    rtoNumber: Joi.string(),
  });

  const { error, value } = cabSc.validate(req.body);
  if (error) {
    res.status(500).send({ error: error, message: "Invalid cab data" });
  } else {
    next();
  }
}

module.exports = validateCab;
