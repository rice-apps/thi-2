import { NextFunction, Request, Response } from "express";
import { Resend } from "resend";
const { Account, Abc, Duration } = require("../models");
const HttpStatus = require("http-status-codes");
const { ErrorResponse } = require("../helper");
//TODO: Import the Duration model once we merge Branches

// TODO: add key in .env
const resend = new Resend(process.env.RESEND_API_KEY);

class AdminController {
    async whitelist(req: Request, res: Response, next: NextFunction) {
        checkAdminPerm(req);
        try {
            // Assuming email and name is included in request body for whitelist
            const { email, first_name, last_name, is_admin } = req.body;

            const tempPassword = generateTempPassword(8);

            const newAccount = new Account({
                email,
                password: tempPassword, //TODO: Hash?
                first_name,
                last_name,
                // Unsure how the following are set when whitelisting
                is_admin: is_admin,
                isActive: false,
                is_deleted: false,
                authorization_token: null,
            });

            const savedAccount = await newAccount.save();

            await sendEmail(
                email, // To
                "Your Temporary Account Password", // Subject
                `Your temporary password is: ${tempPassword}` // Body
            );

            return {
                message:
                    "Account created and email sent with temporary password.",
                account: savedAccount._doc,
            };
        } catch (err: any) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            });
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        checkAdminPerm(req);
        try {
            const email = req.body.email;

            const deletedAccount = await Account.findOneAndDelete({ email });

            if (!deletedAccount) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Account with email ${email} not found.`,
                });
            }

            return {
                message: `Account with email ${email} successfully deleted.`,
                deletedAccount: deletedAccount._doc,
            };
        } catch (err: any) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            });
        }
    }

    async findAllAbc(req: Request, res: Response, next: NextFunction) {
        checkAdminPerm(req);
        try {
            const abcRecords = await Abc.find();

            return {
                message: "Successfully fetched all ABC records.",
                data: abcRecords,
            };
        } catch (err: any) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            });
        }
    }

    async findAllDuration(req: Request, res: Response, next: NextFunction) {
        checkAdminPerm(req);
        try {
            const durationRecords = await Duration.find();

            return {
                message: "Successfully fetched all Duration records.",
                data: durationRecords,
            };
        } catch (err: any) {
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            });
        }
    }
    //TODO: Implement getDuration once we merge Branches (make sure its correct )
    async getDurationById(req: Request, res: Response, next: NextFunction) {
        checkAdminPerm(req);
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
            throw new ErrorResponse({
                statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message: err,
            });
        }
    }
}
function checkAdminPerm(req: any) {
    if (!req.user.is_admin) {
        throw new ErrorResponse({
            statusCode: HttpStatus.StatusCodes.UNAUTHORIZED,
            message: `Account is not an admin.`,
        });
    }
}
function generateTempPassword(length: number): string {
    const chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let tempPassword = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        tempPassword += chars[randomIndex];
    }
    return tempPassword;
}

async function sendEmail(to: string, subject: string, text: string) {
    try {
        const response = await resend.emails.send({
            from: "your-email@example.com", // Replace with our sender email
            to: to,
            subject: subject,
            text: text,
        });
        return response; // Return response from Resend for debugging
    } catch (error) {
        throw new Error(`Error sending email`);
    }
}

module.exports = new AdminController();
