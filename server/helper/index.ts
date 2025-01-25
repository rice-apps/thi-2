const wrapMiddleware = require("./wrap.middleware");
const ErrorResponse1 = require("./error.response");
const wrapController = require("./wrap.controller");

module.exports = {
    wrapMiddleware,
    ErrorResponse: ErrorResponse1,
    wrapController
}

export function generateTempPassword({length = 8}: { length?: number }): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let tempPassword = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        tempPassword += chars[randomIndex];
    }
    return tempPassword;
}