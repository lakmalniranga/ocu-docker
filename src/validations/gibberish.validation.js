const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    gibberish: Joi.string().required(),
  }),
};

module.exports = { create };
