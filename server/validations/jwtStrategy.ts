const { Account } = require("../models");
const { ErrorResponse } = require("../helper");
const HttpStatus = require("http-status-codes");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

require("dotenv").config();

const strategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET_KEY,
    },
    async function (jwtPayload: { id: string }, done: any) {
        const account = await Account.findById(jwtPayload.id);
        if (!account || account.is_deleted) {
            return done(
                new ErrorResponse({
                    statusCode: HttpStatus.StatusCodes.UNAUTHORIZED,
                    message: "ACCOUNT REMOVED",
                }),
                false
            );
        }
        const user = {
            id: account._id,
            is_admin: account.is_admin,
        };
        return done(null, user);
    }
);

module.exports = strategy;
