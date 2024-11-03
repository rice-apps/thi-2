const HttpStatus = require("http-status-codes");
import { NextFunction, Request, Response } from "express";

const optError = (error: any) => ({
    success: false,
    statusCode: HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY,
    message: HttpStatus.getReasonPhrase(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY),
    error
});

module.exports = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body, params, query } = req;
            const { error, value } = schema.validate({ ...params, ...body, ...query });
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
                return res.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).json(optError(errors));
            }
            return next();
        } catch (error) {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(optError(error));
        }

    }
}