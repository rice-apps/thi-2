const authRouter = require("./auth.router");
const studentRouter = require("./student.router");
const adminRouter = require("./admin.router");
import express from "express";
const router = express.Router();
const passport = require("passport");
const {jwtAuthenStrategy} = require("../validations")


passport.use(jwtAuthenStrategy);

router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/admin", adminRouter);


module.exports = router;