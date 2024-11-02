import express from "express";
const router = express.Router();
const {wrapMiddleware, wrapController} = require("../helper");
const {studentController} = require("../controllers");
const studentValidation = require("../validations/student.validation");

router.post("/create", wrapMiddleware(studentValidation.create), wrapController(studentController.create));
router.put("/:id", wrapMiddleware(studentValidation.update), wrapController(studentController.update));
router.delete("/:id", wrapMiddleware(studentValidation.delete), wrapController(studentController.delete))
router.get("/:id", wrapMiddleware(studentValidation.findById), wrapController(studentController.findById));



module.exports = router;