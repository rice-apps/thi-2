const authRouter = require("./auth.router");
const abcRouter = require("./abc.router");
import express from "express";
const router = express.Router();
const passport = require("passport");
const {jwtAuthenStrategy} = require("../validations")


passport.use(jwtAuthenStrategy);

router.use("/auth", authRouter);
router.use("/abc", abcRouter);


module.exports = router;