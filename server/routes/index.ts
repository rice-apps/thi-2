const authRouter = require("./auth.router");
import express from "express";
const router = express.Router();

router.use("/auth", authRouter);

module.exports = router;