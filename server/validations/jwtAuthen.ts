var passport = require("passport");

const jwtStrategy = passport.authenticate("jwt", {session: false, failWithError: true});

module.exports = jwtStrategy;