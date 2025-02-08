const authRouter = require("./auth.router");
const durationRouter = require("./duration.router");
const studentRouter = require("./student.router");
import express from "express";
const router = express.Router();
const passport = require("passport");
const { jwtAuthenStrategy } = require("../validations");

passport.use(jwtAuthenStrategy);

router.use("/auth", authRouter);
router.use("/duration", durationRouter);
router.use("/student", studentRouter);

module.exports = router;
