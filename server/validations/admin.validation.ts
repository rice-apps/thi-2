import Joi from "joi"

module.exports = {
    whitelist: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        tier: Joi.number().required()
    }),
    update: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        tier: Joi.number().required(),
        id: Joi.string().required(),
    }),
    delete: Joi.object({
        email: Joi.string().required(),
    }).unknown(true),
    findByEmail: Joi.object({
        email: Joi.string().required(),
    }).unknown(true),
};