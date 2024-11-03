const HttpStatus = require("http-status-codes");
import { NextFunction, Request, Response } from "express";

module.exports = (controller: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        controller(req, res, next).then((value: any) => {
            const { message, ...rest } = value;
            res.status(HttpStatus.StatusCodes.OK).json({
                success: true,
                statusCode: HttpStatus.StatusCodes.OK,
                message: message || null,
                data: { ...rest }
            })
        }).catch((error: any) => {
            const { isError, ...rest } = error;
            if (error.isError) {
                res.status(error.statusCode).json({
                    success: false,
                    ...rest 
                })
            } else {
                res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    statusCode: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                    message: HttpStatus.getStatusText(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR),
                })
            }
        })
    }
}