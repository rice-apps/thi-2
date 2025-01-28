
import { NextFunction, Request, Response } from "express";
const HttpStatus = require("http-status-codes");
const {ErrorResponse} = require("../helper");

class AuthController {
    // For reference purposes only, NOT actual implementation
    async signUp(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body;

        if (email.length > 20) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                message: "Email too long",
            })
        }
        return {message: "Request processed!", email: email};
    }
}

module.exports = new AuthController();