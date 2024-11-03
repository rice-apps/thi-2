const {Account} = require("../models");
const {ErrorResponse} = require("../helper")
const HttpStatus = require("http-status-codes");

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

require("dotenv").config();

const strategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: process.env.JWT_SECRET_KEY
    }, async function(jwtPayload: any, done: any) {
        let account = await Account.findById(jwtPayload.id);
        if (!account) {
            return done(new ErrorResponse({statusCode: HttpStatus.StatusCodes.UNAUTHORIZED, message: "ACCOUNT REMOVED"}));
        }
        if (account.is_deleted) {
            return done(new ErrorResponse({statusCode: HttpStatus.StatusCodes.UNAUTHORIZED, message: "ACCESS REVOKED"}));
        }
        return done(null, jwtPayload, null);
});

module.exports = strategy; 
