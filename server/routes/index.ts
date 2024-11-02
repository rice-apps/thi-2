const authRouter = require("./auth.router");
const studentRouter = require("./student.router");
const durationRouter = require("./duration.router");
import express from "express";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/student", studentRouter);
router.use("/duration", durationRouter);

module.exports = router;