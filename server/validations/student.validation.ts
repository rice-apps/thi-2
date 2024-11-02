import Joi from "joi"

module.exports = {
    create: Joi.object({
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
        id: Joi.string().required()
    }).unknown(true),
    findById: Joi.object({
        id: Joi.string().required()
    }).unknown(true),
};