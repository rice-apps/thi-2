import Joi from "joi";

module.exports = {
  createUser: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    is_admin: Joi.boolean(),
    is_deleted: Joi.boolean(),
    is_active: Joi.boolean(),
    authorization_token: Joi.string(),
  }),
  signUp: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  signIn: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  changePassword: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};
