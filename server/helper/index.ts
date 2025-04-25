const wrapMiddleware = require("./wrap.middleware");
const ErrorResponse1 = require("./error.response");
const wrapController = require("./wrap.controller");
const resendService = require("./sendEmailVerification");
const emailFormat = require("./emailFormat");
const backendHelper = require("./backend-helper");

module.exports = {
  wrapMiddleware,
  ErrorResponse: ErrorResponse1,
  wrapController,
  resendService,
  emailFormat,
  generateRandomPassword: backendHelper.generateRandomPassword,
};
