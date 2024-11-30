import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const Admin = require("@/models/accountModel");
const Abc = require("@/models/abc");
const HttpStatus = require("http-status-codes");
const { ErrorResponse } = require("@/helper");
const Resend = require('resend');

// TODO: KEY
const resend = new Resend(process.env.RESEND_API_KEY);

class AdminController {
    
    async whitelist(req: Request, res: Response, next: NextFunction) {
        try {
            // Create admin first?
            const admin = new Admin(req.body);
            const savedAdmin = await admin.save();

            return savedAdmin._doc;
        } catch (err: any) {
            throw err;
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            
            const email = getEmail(req);
            // get account associated with email?

            if (!mongoose.Types.ObjectId.isValid(email)) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
                    message: `Invalid email format for admin: ${email}.`,
                });
            }

            const deletedAdmin = await Admin.findByEmailAndDelete(email);

            if (!deletedAdmin) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Admin with email ${email} not found.`,
                });
            }

            return deletedAdmin._doc;
        } catch (err: any) {
            throw err;
        }
    }

    async findByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const records = await Abc.find();
            
            const email = getEmail(req);

            const admin = await Admin.findByEmail(email);

            if (!admin) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Admin with email ${email} not found.`
                })
            }

            return admin._doc;
        } catch (err: any) {
            throw err;
        }
    }
}

const getEmail = (req: Request) => {
    const email = req.params.email;

    if (!mongoose.Types.ObjectId.isValid(email)) {
        throw new ErrorResponse({
            statusCode: HttpStatus.StatusCodes.BAD_REQUEST,
            message: `Invalid ID format for admin: ${email}.`,
        });
    }

    return email;
}

module.exports = new AdminController();