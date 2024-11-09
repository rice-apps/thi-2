import express from "express";
const authRouter = require("./auth.router");
const router = express.Router();
const passport = require("passport");
const {jwtAuthenStrategy} = require("../validations")


passport.use(jwtAuthenStrategy);

router.use("/auth", authRouter);


module.exports = router;