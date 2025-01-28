const authRouter = require("./auth.router");
const durationRouter = require("./duration.router");
const studentRouter = require("./student.router");
const abcRouter = require("./abc.router");
const adminRouter = require("./admin.router");
import express from "express";
const router = express.Router();
const passport = require("passport");
const { jwtAuthenStrategy } = require("../validations");

passport.use(jwtAuthenStrategy);

router.use("/auth", authRouter);
router.use("/abc", abcRouter);
router.use("/student", studentRouter);
router.use("/duration", durationRouter);
router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/duration", durationRouter);

module.exports = router;
