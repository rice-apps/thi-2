
import { NextFunction, Request, Response } from "express";
const {Account} = require("../models");
const HttpStatus = require("http-status-codes");
const {ErrorResponse} = require("../helper");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
            first_name: "John",
            last_name: "Doe",
            is_deleted: true
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
                    }, process.env.JWT_SECRET_KEY, {expiresIn: 86400})}
            } else {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                    message: "WRONG PASSWORD",
                })
            }
        } catch (error: any) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message: error.message,
            })
        }
    }

    async changePassword(req: any, res: Response, next: NextFunction) {
        return {message: "Success", ...req.user};
    }
}

module.exports = new AuthController();