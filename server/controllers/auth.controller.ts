
import { NextFunction, Request, Response } from "express";
const {Account} = require("../models");
const HttpStatus = require("http-status-codes");
const {ErrorResponse} = require("../helper");
const jwt = require("jsonwebtoken");

class AuthController {
    // For reference purposes only, NOT actual implementation
    async signUp(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        if (email.length > 20) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                message: "Email too long",
            })
        }

        const account = new Account({
            email: email,
            password: password,
            first_name: "test",
            last_name: "test",
            is_admin: true,
            is_active: true,
            is_deleted: true,
            authorization_token: "test"
        });
        try {
            await account.save();
            return {message: "Request processed!", id: account._id};
        } catch (error) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                message: error,
            })
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const account = await Account.findOne({email: email}, "_id password is_admin").exec();
            if (account.password == password) {
                return {message: "Signed in!", token: jwt.sign({
                    id: account._id, is_admin: account.is_admin
                }, process.env.JWT_PRIVATE_KEY, {expiresIn: '1h'})}
            }
        } catch (error) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                message: error,
            })
        }
    }
}

module.exports = new AuthController();