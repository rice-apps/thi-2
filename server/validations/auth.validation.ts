import Joi from "joi";

module.exports = {
    signUp: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
} 