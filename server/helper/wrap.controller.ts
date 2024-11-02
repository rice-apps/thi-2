const HttpStatus = require("http-status-codes");
import { NextFunction, Request, Response } from "express";

const optError = (error: any) => ({
    success: false,
    statusCode: HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY,
    message: HttpStatus.getReasonPhrase(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY),
    error
});

module.exports = (controller: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        controller(req, res, next).then((value: any) => {
            const { message, ...rest } = value;
            res.send({
                success: true,
                statusCode: HttpStatus.StatusCodes.OK,
                message: message || null,
                data: { ...rest }
            })
        }).catch((error: any) => {
            const { isError, ...rest } = error;
            if (error.isError) {
                res.send({
                    success: false,
                    ...rest
                })
            } else {
                res.send({
                    success: false,
                    statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                    message: HttpStatus.getStatusText(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR),
                    mCode: "INTERNAL_SERVER_ERROR",
                })
            }
        })
    }
}