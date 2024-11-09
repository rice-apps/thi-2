import { NextFunction, Request, Response } from "express";
const HttpStatus = require("http-status-codes");
const ErrorResponse = require("./error.response");

module.exports = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body, params, query } = req;
            const { error } = schema.validate({ ...params, ...body, ...query });
            const errors: Record<string, string> = {};
            if (error) {
                const { details } = error;
                details.map((detail: any) => {
                    const name = detail.path[0];
                    const message = detail.message.replace(/"/g, "");
                    if (errors[name] == null) {
                        errors[name] = message;
                    }
                });
                return next(
                    new ErrorResponse({
                        statusCode: HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY,
                        message: HttpStatus.getReasonPhrase(
                            HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY
                        ),
                        errors,
                    })
                );
            }
            return next();
        } catch {
            next(
                new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY,
                    message: HttpStatus.getReasonPhrase(
                        HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY
                    ),
                })
            );
        }
    };
};
