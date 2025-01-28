const authRouter = require("./auth.router");
const durationRouter = require("./duration.router");
import express from "express";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/duration", durationRouter);

module.exports = router;