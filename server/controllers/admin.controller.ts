import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const Abc = require("@/models/abc");
const HttpStatus = require("http-status-codes");
const { ErrorResponse, generateTempPassword, sendEmail } = require("@/helper");
const Resend = require('resend');
//TODO: Import the Duration model once we merge Branches 
const Duration = require("../models/duration")


// TODO: key and implement Resend to send a temp password to email in whitelist
const resend = new Resend(process.env.RESEND_API_KEY);

class AdminController {
    
    async whitelist(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;

            // Generate temporary password
            const tempPassword = generateTempPassword();

            // Create new account entry with temp password (hashed)
            const newAccount = new Account({
                email,
                password: tempPassword, // Ideally, you would hash the temp password
                role: "admin", // You can set the role or other properties as needed
            });

            const savedAccount = await newAccount.save();

            // Send email with temp password
            await sendEmail({
                to: email,
                subject: "Your Temporary Account Password",
                body: `Your temporary password is: ${tempPassword}`,
            });

            // Respond with the saved account (or any necessary info)
            return res.status(HttpStatus.StatusCodes.CREATED).json({
                message: "Account created and email sent with temporary password.",
                account: savedAccount,
            });
        } catch (err: any) {
            throw err;
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            
            const email = req.body;

            const deletedAccount = await Admin.findByEmailAndDelete(email);

            if (!deletedAccount) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Account with email ${email} not found.`,
                });
            }

            return deletedAccount._doc;
        } catch (err: any) {
            throw err;
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const records = await Abc.find();
            
            const email = getEmail(req);

            const admin = await Admin.findAll(email);

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
    //TODO: Implement getDuration once we merge Branches (make sure its correct ) 
    async getDurationById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const duration = await Duration.findById(id);

            if (!duration) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Duration with ID ${id} not found.`,
                });
            }

            return duration;
        } catch (err: any) {
            throw err;
        }
    }

    async getRecrdById(req: Request, res: Response, next: NextFunction) {
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