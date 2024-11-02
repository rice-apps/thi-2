import Joi from "joi"

module.exports = {
    post: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        tier: Joi.number().required()
    }),
    put: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        tier: Joi.number().required(),
        id: Joi.string().required(),
    }),
    get: Joi.object({
        id: Joi.string().required()
    }).unknown(true),
    delete: Joi.object({
        id: Joi.string().required()
    }).unknown(true),
};