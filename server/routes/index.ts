const authRouter = require("./auth.router");
const studentRouter = require("./student.router");
import express from "express";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/student", studentRouter);

module.exports = router;