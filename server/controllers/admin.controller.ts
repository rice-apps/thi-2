import { NextFunction, Request, Response } from "express";
const Account = require("@/models/accountModel");
const Abc = require("@/models/abc");
const Duration = require("@models/duration");
const HttpStatus = require("http-status-codes");
const { ErrorResponse } = require("@/helper");
const Resend = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

class AdminController {
    async whitelist(req: Request, res: Response, next: NextFunction) {
        try {
            // Name is provided by the user in request body
            const { email, first_name, last_name } = req.body;

            const tempPassword = generateTempPassword(8);

            const newAccount = new Account({
                email,
                password: tempPassword,
                first_name,
                last_name,
            });

            const savedAccount = await newAccount.save();

            await sendEmail(
                email, // To
                "Your Temporary Account Password", // Subject
                `Your temporary password is: ${tempPassword}` // Body
            );

            return res.status(HttpStatus.StatusCodes.CREATED).json({
                message:
                    "Account created and email sent with temporary password.",
                account: savedAccount,
            });
        } catch (err: any) {
            throw err;
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.email;

            const deletedAccount = await Account.findOneAndDelete({ email });

            if (!deletedAccount) {
                throw new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.NOT_FOUND,
                    message: `Account with email ${email} not found.`,
                });
            }

            return res.status(HttpStatus.StatusCodes.OK).json({
                message: `Account with email ${email} successfully deleted.`,
                deletedAccount: deletedAccount._doc,
            });
        } catch (err: any) {
            throw err;
        }
    }

    async findAllAbc(req: Request, res: Response, next: NextFunction) {
        try {
            const abcRecords = await Abc.find();

            return res.status(200).json({
                message: "Successfully fetched all ABC records.",
                data: abcRecords,
            });
        } catch (err: any) {
            throw err;
        }
    }

    async findAllDuration(req: Request, res: Response, next: NextFunction) {
        try {
            const durationRecords = await Duration.find();

            return res.status(200).json({
                message: "Successfully fetched all Duration records.",
                data: durationRecords,
            });
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
        const response = await resend.sendEmail({
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
