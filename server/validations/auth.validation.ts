import Joi from "joi";

module.exports = {
    signUp: Joi.object({
        //Note: Allow TLDs if we are using IANA list of registered TLDs
        email: Joi.string().email({ tlds: { allow: false } }).required,
        password: Joi.string().required()
    }),
    signIn: Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required,
        password: Joi.string().required()
    }),
    changePassword: Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required()
    })
} 