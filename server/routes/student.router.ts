import express from "express";
const router = express.Router();
const {wrapMiddleware, wrapController} = require("../helper");
const {studentController} = require("../controllers");
const studentValidation = require("../validations/student.validation");
const jwtAuthen = require("../validations/jwtAuthen");

router.post("/create", jwtAuthen, wrapMiddleware(studentValidation.create), wrapController(studentController.create));
router.put("/:id", jwtAuthen, wrapMiddleware(studentValidation.update), wrapController(studentController.update));
router.delete("/:id", jwtAuthen, wrapMiddleware(studentValidation.delete), wrapController(studentController.delete))
router.get("/:id", jwtAuthen, wrapMiddleware(studentValidation.findById), wrapController(studentController.findById));



module.exports = router;