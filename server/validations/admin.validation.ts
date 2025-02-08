import Joi from "joi";

module.exports = {
    whitelist: Joi.object({
        //Note: Allow TLDs if we are using IANA list of registered TLDs
        email: Joi.string().email({ tlds: { allow: false } }).required,
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
