import { NextFunction, Request, Response } from "express";
const HttpStatus = require("http-status-codes");
const ErrorResponse = require("./error.response");

module.exports = (controller: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        controller(req, res, next)
            .then((value: any) => {
                const { message, ...rest } = value;
                next({
                    success: true,
                    statusCode: HttpStatus.StatusCodes.OK,
                    message: message || null,
                    data: { ...rest },
                });
            })
            .catch((error: any) => {
                const { success, ...rest } = error;
                if (!success) {
                    next(
                        new ErrorResponse({
                            ...rest,
                        })
                    );
                } else {
                    next(
                        new ErrorResponse({
                            success: false,
                            statusCode:
                                HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                            message: HttpStatus.getStatusText(
                                HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR
                            ),
                        })
                    );
                }
            });
    };
};
