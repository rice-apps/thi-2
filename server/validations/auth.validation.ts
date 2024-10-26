import Joi from "joi";

module.exports = {
  signUp: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
  }),
  setPassword: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  signIn: Joi.object({}),
  changePassword: Joi.object({}),
  forgetPasswrod: Joi.object({}),
  updateInfo: Joi.object({}),
  info: Joi.object({}),
  logOut: Joi.object({}),
  removeAccount: Joi.object({}),
};
