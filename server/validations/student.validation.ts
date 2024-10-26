import Joi from "joi"

module.exports = {
    create: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        tier: Joi.number().required()
    })
};