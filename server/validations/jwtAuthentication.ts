const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const {Account} = require("../models");
require("dotenv").config();

module.exports = passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_PRIVATE_KEY},
    function (jwtPayload: any, cb: any) {
        return AccountModel.findOneById(jwtPayload.id)
            .then((user: typeof AccountModel) => {
                if (user.is_deleted) {
                    return cb("Account has been revoked access");
                }
                return cb(null, user);
            })
            .catch((err: any) => {
                return cb(err);
            });
    }
));