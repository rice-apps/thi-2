import Joi from "joi"

module.exports = {
    whitelist: Joi.object({
        //Note: Allow TLDs if we are using IANA list of registered TLDs
        email: Joi.string().email({ tlds: { allow: false } }).required,
    }),
    delete: Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required,
    }).unknown(true),
};