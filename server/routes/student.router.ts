import express from "express";
const router = express.Router();
const {wrapMiddleware, wrapController} = require("../helper");
const {studentController} = require("../controllers");
const studentValidation = require("../validations/student.validation");

router.post("/create", wrapMiddleware(studentValidation.create), wrapController(studentController.create));

module.exports = router;