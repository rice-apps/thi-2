const wrapMiddleware = require("./wrap.middleware");
const ErrorResponse1 = require("./error.response");
const wrapController = require("./wrap.controller");

module.exports = {
    wrapMiddleware,
    ErrorResponse: ErrorResponse1,
    wrapController
}
