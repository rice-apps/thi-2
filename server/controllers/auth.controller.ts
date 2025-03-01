import { NextFunction, Request, Response } from "express";
const { Account } = require("../models");
const HttpStatus = require("http-status-codes");
const { ErrorResponse } = require("../helper");
const jwt = require("jsonwebtoken");
const SEC_IN_ONE_DAY = 86400;
require("dotenv").config();

class AuthController {
    // For reference purposes only, NOT actual implementation
    async signUp(req: Request, res: Response, next: NextFunction) {
        let { email, password } = req.body;
        email = email.toLowerCase();
        if (email.length > 20) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                message: "Email too long (20 char limit)",
            });
        }
        const alreadySignedUp = await Account.findOne({ email: email });

        if (alreadySignedUp) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                message: "Account already signed up",
            });
        }

        const account = new Account({
            email: email,
            password: password,
            first_name: "John",
            last_name: "Doe",
            is_deleted: false,
            is_admin: true,
        });
        try {
            await account.save();
            return { message: "Request processed!", id: account._id };
        } catch (error) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message: error,
            });
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        let { email, password } = req.body;
        email = email.toLowerCase();
        const account = await Account.findOne(
            { email: email },
            "_id password is_admin is_deleted first_name last_name"
        ).exec();
        if (!account || account.is_deleted) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                message: "ACCOUNT NOT FOUND",
            });
        }
        if (account.password == password) {
            return {
                message: "Signed in!",
                token: jwt.sign(
                    { id: account._id },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: SEC_IN_ONE_DAY }
                ),
                first_name: account.first_name,
                last_name: account.last_name,
            };
        } else {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                message: "WRONG PASSWORD",
            });
        }
    }

    async changePassword(req: any, res: Response, next: NextFunction) {
        return { message: "Success", ...req.user };
    }
}

module.exports = new AuthController();
