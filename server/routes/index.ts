const authRouter = require("./auth.router");
import express from "express";
const router = express.Router();
const passport = require("passport");
const {jwtAuthenStrategy} = require("../validations")


passport.use(jwtAuthenStrategy);

router.use("/auth", authRouter);


module.exports = router;